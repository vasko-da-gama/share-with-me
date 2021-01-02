package ru.share_with_me.app.ini_parser;

import org.ini4j.Ini;
import java.io.FileReader;
import java.util.HashMap;

public class IniParser {

    private HashMap<String, String> parameters;

    public IniParser() throws java.io.FileNotFoundException, java.io.IOException {

        ClassLoader classLoader = getClass().getClassLoader();

        Ini ini = new Ini(new FileReader(classLoader.getResource("config.ini").getFile()));
        this.parameters = new HashMap<>();

        for (String key : ini.get("database").keySet())
        {
            this.parameters.put(key, ini.get("database").fetch(key));
            System.out.println("database/" + key + " = " + ini.get("database").fetch(key));
        }
    }

    public String getParameter(String name) {
        return this.parameters.get(name);
    }
}