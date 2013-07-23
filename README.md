Testform
========

Method of testing complex Enterprise Application Integrations

The goals of testform is to bring automated testing (verification) of the expected data in ERP type applications.    
By creating a method of developing tests for data accuracy and correct functionality in systems.    

With the following requirements, and a very minimal set of features, but useful in the real world.    

- Vendor, application, language agnostic    
A reference implementation in Javascript will be provided here. Implementations for other platforms, Java, etc.. should be not too difficult.    

- Very short and easy to deal with    
There must be a tiny learning curve    
    
Protocol
========
####1.0 Test file
A Testform is a text file, each line is a command, or definition of an alias for a command.

####1.1 Commands
#####1.1.1 alias
*alias* can be used as the first word of a line. It is followed by a name and command that the alias name can be used in place of.

#####1.1.2 Locator commands
A Locator command defines where a datasource is, although it may also define a file to be run, or command for another application.
In the reference code, the following URI scheme is used.  *type://<user:pass@server:port/db>*    
The reference code uses the CNX library (and supporting modules), so those types are supported.    
[https://github.com/dpweb/cnx] (https://github.com/dpweb/cnx)    

#####1.1.3 Command commands
A Command command gives parameters to whatever is defined by the locator.

#####1.1.4 Evaluator
An Evaluator defines what constitutes a successful test, as the result of a command being exectuted against the located target.    
It is a return function for whatever language platform is being used, in this case Javascript.  Javascript is the main platform for Testform
and the reference code for the protocol is in Javascript.  Other languages could be implemented.  Note that all kinds of platforms can be
tested with Testform, only the test runner would need to reside in Javascript.   

An evaluator is code in the language of the implementation. In Javascript it returns a JSON object with two keys.    
*success* which evaluates to true/false    
*comment* which can provide comments to the testing program

#####1.1.5 Comments
Lines that begin with // are not evaluated.

####1.2 Examples    
A testform testfile follows, which shows the four types of commands.    

#####testform.txt
````
// This SQL Server database location is aliased with the term *mydb*
alias mydb sqlserver://<user:pass@server:port/db>

// This SQL command is aliased with the term *hasUsers*
alias hasUsers select count(*) from users;

// This evaluator is aliased with the term *NotZero*
alias notZero { return {success: 1, comment: r} } }

// This line will test that database and return the result success/fail
mydb hasUsers notZero
````

The Strategy
============
<img src='https://www.filepicker.io/api/file/srryXNVBSIStlfoKFjyU'/>
    
A test list is run, and failed tests generate bugs, which are fixed.  If an error occurs, it must be because of 
inadequate test coverage so a new test is generated that will catch the error in the future.  This is ok, as test 
creation is an ongoing process.
