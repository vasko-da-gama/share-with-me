### Настройка Tomcat и проекта
1. Исправить файл conf/server.xml. Добавить в него новый хост (или исправить дефолтный)

```
<Host name="share-with-me"  appBase="share_with_me"
        unpackWARs="true" autoDeploy="true">

    <!-- SingleSignOn valve, share authentication between web applications
            Documentation at: /docs/config/valve.html -->
    <!--
    <Valve className="org.apache.catalina.authenticator.SingleSignOn" />
    -->

    <!-- Access log processes all example.
            Documentation at: /docs/config/valve.html
            Note: The pattern used is equivalent to using pattern="common" -->
    <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
            prefix="share_with_me_access_log" suffix=".txt"
            pattern="%h %l %u %t &quot;%r&quot; %s %b" />

</Host>
```
    

2. Добавить в кореневую директорию Tomcat папку share_with_me
3. Перейти в директорию с проетом и собрать war файл с помощью команды

```
mvn clean package
```
После выполнения команды в директории target появится war файл, который нужно переименовать в ROOT.war

4. Перенести файл ROOT.war в share_with_me
5. Запустить сервер. Сервер распакует war файл и приложение будет доступно по ссылке в браузере:
```
http://share-with-me:PORT
```
Где PORT - номер порта, который слушает Tomcat

Его можно изменить в файле conf/server.xml, для этого надо найти следующие строки

```
<Connector port="8081" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
```
    

</ol>