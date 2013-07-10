Testform
========

Method of testing complex Enterprise Application Integrations

The kinds of enterprise applications I work with, are very prone to obscure data problems.    
For example, we have an ERP like application with 35 integrations to other systems,      
Procurement, HR, ERP, Data center applications, Network monitoring tools, the list goes on and on..    

The goals of testform is to bring automated testing (verification) of the expected data in these applications.    
By creating a method of developing tests for data accuracy and functionality in systems.    

With the following requirements, and a very minimal set of features, but useful in the real world.    

+Vendor, application, language agnostic    
A reference implementation in Javascript will be provided here. Implementations for other platforms, Java, etc.. should be not too difficult.    

+Very short and easy to deal with    
There must be a tiny learning curve    
    
Protocol
========
+A Testform is a list of tests, in a script file like so..

script.txt
````
alias mydb sqlserver://<user:pass@server:port/db>
alias hasUsers select count(*) from users;
alias notZero { return {isSuccess: 1, Comment: r} } }

mydb hasUsers notZero
````
+ the alias command gives friendly names to connection strings, queries, and return functions
+ A test is specified by a connection string (or alias for it), a command (or db query), and return function.
+ The return functin evaluates the response from the remote server, r is the value returned.  You return an object with 
+ {
+   isSuccess: <evaluates to true|false>
+   Comment: a Comment for the test
+ }

