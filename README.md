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
+A Testform is a list
+Each item is either a test or a wait command      
    
A test consists of:

1) A Locator.  A URL, Connection string, etc.. that defines the location of the application or database.    
A common URL structure is used for several database types here.. 

protocol://user:password@host[:port]/(database|datasource id)    
    
2) A command (or database query).  That returns a result 0 or 1.  0 is test failure, 1 is test success.
    
Very simple to format this as (TAP)[http://en.wikipedia.org/wiki/Test_Anything_Protocol] as well.    
    
Fix any failed tests.  Error found that tests didn't find?  Create new test for that condition.    
    
A wait command pauses execution of the test list.  It's used when we need the test to wait for something to happen.  Like other systems updating data and they only update on the hour.    
