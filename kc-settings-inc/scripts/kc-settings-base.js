Array.prototype.unique=function(){var b=this.concat();for(var d=0;d<b.length;++d){for(var c=d+1;c<b.length;++c){if(b[d]===b[c]){b.splice(c,1)}}}return b};function kcCountObj(c){var b=0;for(var a in c){if(c.hasOwnProperty(a)){++b}}return b}function kcsbSlug(a){strNu=a.replace(/^\-+/,"");strNu=strNu.replace(/^_+/,"");strNu=strNu.replace(/[^A-Za-z0-9\-_]/g,"");if(strNu.match(/^\-+/)||strNu.match(/^_+/)){strNu=kcsbSlug(strNu)}return strNu}function invertColor(a){inverted=new RGBColor(a);if(inverted.ok){a="rgb("+(255-inverted.r)+", "+(255-inverted.g)+", "+(255-inverted.b)+")"}return a}(function(e,i){var a="kcPostFinder",c=false,l=e(i),k=[".kc-find-post"],g,f,b,j,h,d=function(){return k.join(", ")};activate=function(){f=e("#find-posts-input");b=e("#find-posts-response");j=e("#find-posts-submit");h=e("#find-posts-close");j.on("click.kcPostFinder",function(q){q.preventDefault();if(!g.data("kcTarget")){return}var o=b.find("input:checked");if(!o.length){return false}var m=g.data("kcTarget"),p=m.val(),p=p===""?[]:p.split(","),n=o.val();if(m.is(".unique")){m.val(n)}else{if(e.inArray(n,p)<0){p.push(n);m.val(p.join(","))}}});l.on("dblclick.kcPostFinder",'input[name="found_post_id"]',function(){j.trigger("click.kcPostFinder")});l.on("click.kcPostFinder","#find-posts-close",function(){f.val("");g.removeData("kcTarget")});c=true},deactivate=function(){unbind();j.off("click.kcPostFinder");l.off("dblclick.kcPostFinder");l.off("click.kcPostFinder");g=f=b=j=h=null;c=false},action=function(m){g.data("kcTarget",e(this));findPosts.open()},bind=function(){l.on("dblclick.kcPostFinder",d(),action)},unbind=function(){l.off("dblclick.kcPostFinder",d(),action)},publicMethod=e[a]=function(m){var n=this;if(c){if(!m){return}unbind()}else{g=e("#find-posts");if(!g.length){return}activate()}if(m){k=k.concat(m.split(","))}bind();return n};publicMethod.destroy=function(){deactivate()}}(jQuery,document));(function(h,m){var c="kcRowCloner",d=false,o=h(m),f=["text","textarea","color","date","datetime","datetime-local","month","week","email","password","number","tel","time","url"],j={add:[],del:[]},g=function(){l();d=true},b=function(){p();d=false;j={add:[],del:[]}},e=function(w){var u=h(w.target),t;if(u.is("a.add")){t=q}else{if(u.is("a.del")){t=n}else{if(u.is("a.clear")){i(h(this));w.stopPropagation();return}else{return}}}w.preventDefault();var r=h(this),v=!r.next(".row").length,s=r.parent();t.call(w,{anchor:u,item:r,mode:r.data("mode"),isLast:v,block:s});w.stopPropagation()},q=function(s){var t=this,r=i(s.item.clone(false).addClass("adding").hide());h(".hasdep",r).kcFormDep();s.nuItem=r.insertAfter(s.item);s.block=s.block.kcReorder(s.mode,true);a("add",t,s);s.nuItem.fadeIn("slow",function(){s.nuItem.removeClass("adding")})},n=function(r){var s=this;if(!r.item.siblings(".row").length){r.item=i(r.item);r.item.find(".hasdep").trigger("change");r.removed=false;a("del",s,r)}else{r.removed=true;r.item.addClass("removing").fadeOut("slow",function(){r.item.remove();if(!r.isLast){r.block=r.block.kcReorder(r.mode,true)}delete r.item;a("del",s,r)})}},i=function(r){r.find(":input").each(function(){var t=h(this),s=this.type;if(t.data("nocleanup")===true){return}if(h.inArray(s,f)>-1){t.removeAttr("style").val("")}else{if(s==="checkbox"||s==="radio"){t.prop("checked",this.checked)}}});return r},a=function(u,t,r){for(var s=0;s<j[u].length;s++){j[u][s].call(t,r)}},l=function(){o.on("click.kcRowCloner","li.row",e)},p=function(){o.off("click.kcRowCloner","li.row",e)},k=h[c]=function(){var r=this;if(d){return}g();return r};k.destroy=function(){b()};k.addCallback=function(r,s){if(j.hasOwnProperty(r)&&h.isFunction(s)){j[r].push(s)}}})(jQuery,document);(function(a){var b=a(document);a.fn.kcGoto=function(c){defaults={offset:-20,speed:800};c=a.extend({},defaults,c);return this.each(function(){var d=a(this);d.fadeIn(function(){a("html, body").stop().animate({scrollTop:(d.offset().top+c.offset)},c.speed)})})};a.fn.kcFormDep=function(d){var e={disable:true,callback:function(){}},d=a.extend({},e,d),c=function(g){var f=a(g.target),h=f.val();f.data("depTargets").each(function(){var k=a(this);if(g.kcfdInit===true){if(k.data("kcfdInit")){return}else{k.data("kcfdInit",true)}}var j=k.data("dep"),i=false;if(!f.prop("disabled")&&(((typeof j==="string"||typeof j==="number")&&j==h)||(typeof j==="object"&&a.inArray(h,j)>-1))){i=true}k.toggle(i);if(d.disable===true){k.find(":input").prop("disabled",!i).trigger("change")}})};return this.each(function(){var f=a(this),h=f.val(),g=(f.data("scope")!==undefined)?f.closest(f.data("scope")).find(f.data("child")):a(f.data("child"));if(g.length){f.data("depTargets",g).on("change",c).trigger({type:"change",kcfdInit:true})}})};a.fn.kcReorder=function(j,e){var h=new RegExp(j+"\\]\\[(\\d+)"),g=new RegExp(j+"\\-(\\d+)"),d=a(this);if(e===true){var f=d.children(),c=0}else{var f=d,c=d.index()}f.each(function(){var i=a(this);i.find(":input").each(function(){this.name=this.name.replace(h,function(l,k){return j+"]["+c});if(this.id!==""){this.id=this.id.replace(g,function(l,k){return j+"-"+c})}});i.find("label").each(function(){var k=a(this),l=k.attr("for");if(l!==""&&l!==undefined){k.attr("for",l.replace(g,function(n,m){return j+"-"+c}))}});c++});return this};a.fn.kcTabs=function(){var c=function(g){g.preventDefault();var d=a(g.currentTarget),f=d.parent();if(f.hasClass("tabs")){return}d.closest("ul").data("kcTabsPanels").hide().filter(d.data("kcTabsPanel")).show();f.addClass("tabs").siblings().removeClass("tabs")};return this.each(function(){var e=a(this),d=a();$panels=a();e.children().each(function(f){var g=a(this).children("a").first();if(!g.length){return}var h=a(g.attr("href"));if(!h.length){return}$panels=$panels.add(h);d=d.add(g);g.data("kcTabsPanel",h).on("click",c)});e.data({kcTabsPanels:$panels,kcTabsAnchors:d});d.first().trigger("click")})};a.fn.kcMetaboxDeps=function(){var c=a(this),e=c.find("div.metabox-holder");if(!e.length){return c}var g=e.attr("id"),f=c.find(":checkbox");if(!f.length){return c}var d=a();f.each(function(){var j=a("#"+g+"-"+this.value);if(!j.length){return}var i=a(this),h=a("#"+g+"-"+this.value+"-hide");i.data("sectHider",h).data("sectBox",j);if(!(this.checked===h[0].checked)){h.prop("checked",this.checked).triggerHandler("click")}d=d.add(i)});if(!d.length){return c}d.change(function(){var h=a(this);h.data("sectHider").prop("checked",this.checked).triggerHandler("click");if(this.checked){h.data("sectBox").kcGoto({offset:-40,speed:"slow"})}})};if(!Modernizr.details){b.on("click","summary",function(f){if(a(f.target).is("a")){return}var c=a(this),d=c.parent();if(d.attr("open")){d.removeAttr("open")}else{d.attr("open","open")}})}})(jQuery);