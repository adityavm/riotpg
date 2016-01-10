/**
 * component
 */
<dog>
	<div id="example"><b>{entity}</b>: {message}</div>

  <script>
    var that = this,
        model = this.opts.model;

		this.entity = model.is();
		this.message = model.said();

    model.on("spoke", function(){
      console.log("spoke", model.said());
      that.update({message: model.said()});
    });
	</script>
</dog>
