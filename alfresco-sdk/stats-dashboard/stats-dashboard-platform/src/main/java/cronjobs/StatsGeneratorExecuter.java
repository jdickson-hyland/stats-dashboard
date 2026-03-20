package cronjobs;

import model.StatsConfig;
import model.StatsQueryResult;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.*;
import org.alfresco.service.cmr.search.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.StatefulJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import services.StatGeneratorHelper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class StatsGeneratorExecuter implements StatefulJob {
    private static final Logger LOG = LoggerFactory.getLogger(StatsGeneratorExecuter.class);

    private ServiceRegistry serviceRegistry;
    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    private StatGeneratorHelper statGeneratorHelper;
    public void setStatGeneratorHelper(StatGeneratorHelper statGeneratorHelper) {this.statGeneratorHelper = statGeneratorHelper;}

    /**
     * On execute retrieves all json Configs of type venzia:statconfig,
     * parses each config and launch the needed queries to build an output json,
     * then saves that json in the specified path
     * */
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        if(LOG.isDebugEnabled()){LOG.debug("+++ Starting stats generator executer +++");}
        long startMilis = System.currentTimeMillis();
        //get jsons of type venzia:statConfig
        ResultSet rs = statGeneratorHelper.searchStatsConfigs();

        /**List of json files each one have several queries*/
        List<StatsConfig> configs = new ArrayList<>();

        //parse each nodeRef to statConfigObject
        rs.forEach(result -> {
            StatsConfig statsConfig = statGeneratorHelper.parseContentToStatConfig(result);
            configs.add(statsConfig);
        });

        //for each config launch search
        configs.forEach(config -> {
            JSONArray searchs = config.getQueries();
            List<StatsQueryResult> results = new ArrayList<>();
            //for each query get its results
            searchs.forEach(searchDefinition -> {
                JSONObject searchObject = new JSONObject(searchDefinition.toString());
                StatsQueryResult searchResult = statGeneratorHelper.getResultsForQuery(searchObject);
                results.add(searchResult);
            });

            //build stat report JSON OUTPUT
            HashMap<String, Object> jsonOutput = new HashMap<>();
            jsonOutput.put("id", config.getId());
            ArrayList<Object> resultsArray = new ArrayList<>();
            results.forEach(result -> resultsArray.add(result.toHashmap()));
            jsonOutput.put("results", resultsArray);

            //save stat report in path
            String destinationFolderPath = config.getOutputPathFolder();
            ResultSet folderPathSearch = serviceRegistry.getSearchService().query(StoreRef.STORE_REF_WORKSPACE_SPACESSTORE, SearchService.LANGUAGE_FTS_ALFRESCO, "PATH:"+destinationFolderPath);
            if(folderPathSearch.length() != 0){
               statGeneratorHelper.saveJsonInPath(folderPathSearch, config, jsonOutput);
            }else{
                throw new RuntimeException("Folder " + destinationFolderPath + " not found");
            }
        });
        long endMilis = System.currentTimeMillis();
        if(LOG.isDebugEnabled()){
            long time = endMilis - startMilis;
            System.out.println("+++ Ending stats generator executer: reports generation time =  "+ time +" ms +++ ");
        }
    }
}
