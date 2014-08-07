$.extend({
    _initialize: function() {
        // Set your API keys here
        var PARSE_APPLICATION_KEY = 'YOUR PARSE APP KEY',
            PARSE_JAVASCRIPT_API_KEY = 'YOUR PARSE JAVASCRIPT KEY';

        Parse.initialize(PARSE_APPLICATION_KEY, PARSE_JAVASCRIPT_API_KEY);
        return false;
    },

    ParseGet: function(className, objectId, successCallBack, errorCallBack, callbackArgs) {
        // Initialize Parse if it's not
        if (typeof Parse === 'undefined') {
            _initialize();
        }

        // make sure we have some valid data
        if (className === null || typeof className === 'undefined') {
            throw '`class` is required';
        }

        if (objectId === null || typeof objectId === 'undefined') {
            throw '`objectId` is required';
        }

        var classObject = Parse.Object.extend(className),
            query = new Parse.Query(classObject),
            returnObj;

        try {
            returnObj = query.get(objectId, {
                success: function(result) {
                    if (typeof successCallBack === 'undefined' || successCallBack === null) {
                        return result;
                    } else {
                        successCallBack(result, callbackArgs);
                    }
                },
                error: function(model, error) {
                    if (typeof errorCallBack === 'undefined' || errorCallBack === null) {
                        return [{
                            'model': model,
                            'error': error
                        }];
                    } else {
                        errorCallBack(model, error, callbackArgs);
                    }
                }
            });

            return returnObj;
        } catch (e) {
            return [{
                'model': null,
                'error': e
            }];
        }
    },

    ParseGetRelation: function(parentObject, property, successCallBack, errorCallBack, callbackArgs) {
        // Initialize Parse if it's not
        if (typeof Parse === 'undefined') {
            _initialize();
        }

        if (parentObject === null || typeof parentObject === 'undefined') {
            throw '`parentObject` is undefined';
        }

        // make sure we have some valid data
        if (property === null || typeof property === 'undefined') {
            throw '`property` is null or undefined';
        }

        var relation = parentObject.relation(property),
            returnObj;

        returnObj = relation.query().find({
            success: function(relations) {
                if (typeof successCallBack === 'undefined' || successCallBack === null) {
                    return relations;
                } else {
                    successCallBack(relations, callbackArgs);
                }
            },
            error: function(model, error) {
                if (typeof errorCallBack === 'undefined' || errorCallBack === null) {
                    return [{
                        'model': model,
                        'error': error
                    }];
                } else {
                    errorCallBack(model, error, callbackArgs);
                }
            }
        });

        return returnObj;
    },

    ParseGetRelationRecursive: function(parentObject, property, successCallBack, errorCallBack, callbackArgs) {
        // TODO
        return false;
    },

    /**
        Executes a query against Parse

        *** Note that queryArgs should be an array of JSON objects defined as follows
        {
            "operator": "Operator to be used (equalTo, notEqualTo, greaterThan, etc.." (see https://www.parse.com/docs/js_guide#queries),
            "key": "the property to query",
            "value": "the value to query for"
        }

        An example would be:
        {
            "operator": "equalTo",
            "key": "isActive",
            "value": false
        }

        This would query for any {className} with the isActive property set the false.

        Value can be an array, object, or basic value like string, int, bool etc... The library will figure out what to do based on the type of object

        Operators with no Key: // TODO
        For Operators that don't require a "Key" like Limit leave "Key" null and pass your limit as "Value". ASC or DESC for direction

        Sorting:
        For sorting use "Sort" as the operator, the property to sort on as "Key", and the direction as the "Value"

    
        Retriving multiple objects matching several different values: //TODO
        For queries that can accept multiple values like containedIn set the value as an Array of values

        @method ParseQuery
        @public
        @return Object
    **/
    ParseQuery: function(className, queryArgs, successCallBack, errorCallBack, callbackArgs) {
        // Initialize Parse if it's not
        if (typeof Parse === 'undefined') {
            _initialize();
        }

        // make sure we have some valid data
        if (className === null || typeof className === 'undefined') {
            throw '`className` is required';
        }

        if (queryArgs === null || typeof queryArgs === 'undefined' || queryArgs.length === 0) {
            throw '`queryArgs` is required';
        }

        var classObject = Parse.Object.extend(className),
            query = new Parse.Query(classObject),
            returnObj;

        $.each(queryArgs, function (i, arg) {
            switch (arg.operator.toLowerCase()) {
                // basic comparison coperators
                case "equalto":
                    query.equalTo(arg.key, arg.value);
                    break;
                case "notequalto":
                    query.notEqualTo(arg.key, arg.value);
                    break;
                case "greaterthan":
                    query.greaterThan(arg.key, arg.value);
                    break;
                case "greaterthanorequalto":
                    query.greaterThanOrEqualTo(arg.key, arg.value);
                    break;
                case "lessthan":
                    query.lessThan(arg.key, arg.value);
                    break;
                case "lessthanorequalto":
                    query.lessThanOrEqualTo(arg.key, arg.value);
                    break;
                case "sort":
                    if (arg.value.toLowerCase() === 'asc') {
                        query.ascending(arg.key);
                    } else if (arg.value.toLowerCase() === 'desc') {
                        query.descending(arg.key);
                    } else {
                        console.log('Unknown sort operator: ' + arg.values + ' Skipping this operator.');
                    }
                    break;
                default:
                    console.log('Unknown operator: ' + arg.operator + ' Skipping this operator.');
                    break;
            }
        });

        returnObj = query.find({
            success: function (results) {
                if (typeof successCallBack === 'undefined' || successCallBack === null) {
                    return results;
                } else {
                    successCallBack(results, callbackArgs);
                }
            },
            error: function(model, error) {
                if (typeof errorCallBack === 'undefined' || errorCallBack === null) {
                    return [{
                        'error': error
                    }];
                } else {
                    errorCallBack(error, callbackArgs);
                }
            }
        });

        return returnObj;
    },

    ParseCreate: function(className, objectToCreate) {
        // TODO
        return false;
    },

    ParseCreateRelation: function() {
        // TODO
        return false;
    },

    ParseSave: function(className, objectToSave) {
        // TODO
        return false;
    },

    ParseDelete: function(className, idToDelete) {
        // TODO
        return false;
    }
});
