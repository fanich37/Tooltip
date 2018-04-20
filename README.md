# Tooltip
Here's the Tooltip - - simple plugin in pure JS.

## How to use
Include `tooltip.min.js` in your HTML markup and it's done. It takes all the elements on the page with the `title` attribute and tooltip it.
If you need this plugin to work on certain elements you can use `data-tooltip` attribute and indicate it via simple API.

## API
Tooltip has only several methods. Here they are:

| Method             | Arguments | Description                                                    |
| -------------      |:---------:| -----                                                          |
| `setOptions(args)` | object    | set some options to customise the appearance                   |
| `reInit()`         | -         | initialise the tooltip again (if it were previously destroyed) |
| `destroy()`        | -         | destroy the tooltip                                            |

Properties that are able for `setOptions` method:

|Options|Default|Possible values|Description
|---|:---:|:---:|---|
|`whereToShow`|"bottom"|"top"|where to show the tooltip relatively to the element|
|`duration`|".3s"|any valid duration in ms|animation duration|
|`property`|"opacity"|transition-property|could be any css transition-property valid value|
|`tooltip`|"*[title]"|"*[data-tooltip]"|define the elements to tooltip
