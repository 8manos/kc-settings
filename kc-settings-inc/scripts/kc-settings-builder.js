(function(a){a.fn.kcsbUnique=function(){return this.each(function(){var c=a(this),b=c.val();c.data("olVal",b).blur(function(){var f=a(this),e=c.data("olVal"),d=f.val();if(d!=e&&a.inArray(d,kcsbIDs[f.data("ids")])>-1){f.val("").focus()}})})};a.fn.kcsbCheck=function(){var b=a(this);if((b.attr("name")==="kcsb[id]"&&b.val()==="id")||b.val()===""){b.val("").focus().css("borderColor","#ff0000");return false}else{b.removeAttr("style")}}})(jQuery);jQuery(document).ready(function(a){var c=a(this);a.kcRowCloner();a.kcRowCloner.addCallback("add",function(d){a("ul.kc-rows").sortable("refresh");d.nuItem.find(".kc-rows").each(function(){a(this).children(".row").not(":first").remove()});a("input.kcsb-ids",d.nuItem).removeData("olVal").kcsbUnique();if(d.isLast){a("> details > summary > .actions .count",d.nuItem).text(d.nuItem.index()+1)}else{d.block.children().each(function(){a("> details > summary > .actions .count",this).text(a(this).index()+1)})}});a.kcRowCloner.addCallback("del",function(d){if(d.isLast){return}d.block.children().each(function(){a("> details > summary > .actions .count",this).text(a(this).index()+1)})});var b=a("#kcsb");if(!b.is(".hidden")){b.kcGoto()}a(".hasdep",b).kcFormDep();c.on("blur","input.kcsb-slug",function(){var d=a(this);d.val(kcsbSlug(d.val()))});a("input.kcsb-ids").kcsbUnique();c.on("blur","input.required, input.clone-id",function(){a(this).kcsbCheck()});a("#new-kcsb").on("click",function(d){d.preventDefault();b.kcGoto()});a("a.kcsb-cancel").on("click",function(d){d.preventDefault();a("#kcsb").slideUp("slow")});a("a.clone-open").on("click",function(d){d.preventDefault();a(this).parent().children().hide().filter("div.kcsb-clone").fadeIn(function(){a(this).find("input.clone-id").focus()})});a("a.clone-do").on("click",function(f){var d=a(this),g=a(this).siblings("input");if(g.kcsbCheck()===false){return false}d.attr("href",d.attr("href")+"&new="+g.val())});a("input.clone-id").on("keypress",function(f){var d=f.keyCode||f.which;if(d===13){f.preventDefault();a(this).blur().siblings("a.clone-do").click()}});a(".kcsb-tools a.close").on("click",function(f){f.preventDefault();var d=a(this);d.siblings("input").val("");d.parent().fadeOut(function(){a(this).siblings().show()})});a("form.kcsb",b).submit(function(f){var d=true;a(this).find("input.required").not(":disabled").each(function(){if(a(this).kcsbCheck()===false){d=false;return false}});if(!d){return false}})});