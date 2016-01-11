/**
 * component
 */
<cat>
	<div id="cat"><b>{entity}</b>: {message}</div>

	<script>
    var self = this,
				model = cat;

		this.entity = model.is();
		this.message = model.said();

    model.on("spoke", function(){
      console.log("spoke", model.said());
      self.update({message: model.said()});
    });
	</script>
</cat>
