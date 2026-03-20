package model;

import org.json.JSONArray;
import org.json.JSONObject;

/**Model for stat config, receives the json and parses it to java object
 * Input json is:<br>
 * <pre>
 *{@code
 {
     "id": "global stats",
     "queries":[
         {
             "query": "cm:creator:admin",
             "facetQueries":[],
             "facetFields":["field:creator"],
             "outputType": "resultNumber",
             "outputLabel": "documentos creados por admin"
         }
        ],
     "outputPath": "cm:contentrepository/myfolder"
    }
 }
 </pre>
 * */
public class StatsConfig {
    /**Unique id of that stat config*/
    String id;
    /**Path in which the output json will be saved*/
    String outputPathFolder;
    /**Name of the generated json, if path+name already exist it will override that doc content!!*/
    String outputName;

    /**Set of queries for each stat, a query is a JSONobject, with several fields, check readme*/
    JSONArray queries;
    public StatsConfig(String json) {
        JSONObject jsonObject = new JSONObject(json);
        setId(jsonObject.getString("id"));
        setOutputPathFolder(jsonObject.getString("outputPathFolder"));
        setOutputName(jsonObject.getString("outputName"));
        setQueries(jsonObject.getJSONArray("queries"));
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOutputPathFolder() {
        return outputPathFolder;
    }

    public void setOutputPathFolder(String outputPathFolder) {
        this.outputPathFolder = outputPathFolder;
    }

    public JSONArray getQueries() {
        return queries;
    }

    public void setQueries(JSONArray queries) {
        this.queries = queries;
    }

    public String getOutputName() {
        return outputName;
    }

    public void setOutputName(String outputName) {
        this.outputName = outputName;
    }
}
