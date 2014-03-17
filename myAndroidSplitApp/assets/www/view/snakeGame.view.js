sap.ui.jsview("view.snakeGame", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.snakeGame
	*/ 
	getControllerName : function() {
		return "view.snakeGame";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.snakeGame
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
			title: "Title",
			content: [
			          
			          // CODESNIP_START
			          var html = new sap.ui.core.HTML({
			            content: '<div class="content"><h4>Lorem ipsum</h4><div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div><a target="_blank" href="http://en.wikipedia.org/wiki/Lorem_ipsum">Learn more about Lorem Ipsum ...</a></div>'
			          });
			          
			          
			          
			
			]
		});
	}

});