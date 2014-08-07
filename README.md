jQuery.Parse
============

jQuery wrapper for the [Parse.com Javascript API](https://www.parse.com/docs/js_guide#javascript_guide)
If you're looking for the jQuery REST wrapper for Parse you'll be wanting [jQuery-Parse](https://github.com/srhyne/jQuery-Parse)

##Current Functionality##
 - Basic Object Retrieval
 - Getting basic relationships
 - Basic queries with some operators

##TODO##
 - Create, Update, Delete operations
 - more fully featured Query operations
 - TESTS
 - 
 
##Basic Usage##
All methods have optional callback arguments for `successCallBack`, `errorCallBack`, and `callbackArgs`. If no callbacks are passed in the method will return the object returned by the Parse API.

    $.ParseGet('MyClass', 'abc12311', wootItWorked, crapItFailed, someUsefulArgs);
    $.ParseGetRelation(myParseObject, 'awesomeRelationshipProperty', wootItWorked, crapItFailed, someUsefulArgs);
    $.ParseQuery('MyClass', [{ 'operator': 'equalTo', 'key': 'moarProperty', 'value': 'RAWR', wootItWorked, crapItFailed, someUsefulArgs }];

##Contributing##
I absolutely admit that [I am the coding horror](http://blog.codinghorror.com/on-the-meaning-of-coding-horror/). This is my first Github project so cut me a little slack ;)

If something sucks, could be done better, or needs to be done feel free to [create an issue](https://github.com/ultimatemonty/jQuery.Parse/issues/new) or fix it and [submit a PR](https://github.com/ultimatemonty/jQuery.Parse/compare/). Or fork and make it better. Whatever suits you. 
