/*jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});*/

var slideimg = "";

var subreddits = [
  "hmm",
  "hmmm",
  "nocontextpics",
  "cursedimages",
  "wtfstockphotos",
  "Whatisthis",
  "notinteresting",
  "pics",
  "RandomPics",
  "photoshopbattles",
  "CrappyDesign",
  "Design",
  "ATBGE",
  "GTBAE",
  "DesignPorn",
  "80sdesign",
  "90sdesign",
  "UnsolicitedRedesigns",
];

var prompts = [
  "President vote-for-me speech",
  "Bedtime story",
  "History lesson",
  "Motivational speech",
  "Factory tour",
  "Gym coach",
  "Skydiving guide",
  "Cooking show",
  "Movie pitch",
  "Art showcase",
  "World domination plan",
  "Breaking news",
  "Nature documentary",
  "Selling something",
  "Story of first date",
  "Funeral",
  "PR agent",
  "Game review",
  "Robbery plan",
  "Rant",
  "Phobia",
  "Big secret",
  "Medical test results",
  "Lyrics explaining",
  "Restaurant order",
  "How I got in prison",
  "Hobby",
  "Science experiement",
  "Rap freestyle",
  "Being late excuse",
  "Future prediction",
  "Apology",
  "Gossip",
];

$('#prompt').text(prompts[Math.floor(Math.random() * prompts.length)]);

document.onkeypress=function(e){
  snd2.play();
  getImage();
};

function preloadImage(url) {
    var img=new Image();
    img.src=url;
}

var imageURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=";
var request = $.getJSON();
function getImage() {
  request.abort();
  request = $.ajax({
    url: 'https://api.reddit.com/r/' + subreddits[Math.floor(Math.random() * subreddits.length)] + '/random/.json?_=' + new Date().getTime(),
    error: function(error){
      console.log(error);
      //alert(JSON.Stringify(error));
      getImage();
    },
    success: function(data){
      if (data[0].data.children[0].data.url.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
        $('#prompt').remove();
        $("#slide").attr("src", data[0].data.children[0].data.url);
        /*imageURL = data[0].data.children[0].data.url;*/
        snd.play();
        preloadImage(imageURL);
      } else {
        getImage();
      }
    },
    timeout: 6000,
  });
}

/*window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}*/

var snd = new Audio("data:audio/mpeg;base64,SUQzAwAAAAABE1RQRTEAAAAMAAAAU291bmRib3kuZGVUWUVSAAAABQAAADIwMDRURFJDAAAABQAAADIwMDRUQ09OAAAACwAAAFNvdW5kIENsaXBDT01NAAAAGwAAAAAAAABodHRwOi8vd3d3LnNvdW5kYm95LmRlQ09NTQAAABsAAABYWFgAaHR0cDovL3d3dy5zb3VuZGJveS5kZf/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhpbmcAAAAPAAAABwAADacARUVFRUVFRUVFRUVFRUVjY2NjY2NjY2NjY2NjY4KCgoKCgoKCgoKCgoKCra2tra2tra2tra2tra2ty8vLy8vLy8vLy8vLy8v39/f39/f39/f39/f39///////////////////AAAAUExBTUUzLjEwMAS5AAAAAAAAAAA1ICQDRE0AAeAAAA2n4UKQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/70GQAAAGLANttBAAIAAANIKAAASeSI0f5zYIAAAA0gwAAAGgW5bVrNZLcN4oCDhACAIAgAxOD4Pwfh/5cEPqBB36w+oH3/wQd//h+D7/4If///4IASgAXXQciBuA2RiMAAAAAGUwgAQEapEgYIAENE8TCpFGg8BcCYRARCfRoAAULmFiaZWFIYOjNw7DBMXOLjQaXkbGABYYIispZcBUIXF64JAxa62YSIF7TBiE0IBw+jACh+5gqkBqwOXhTBZ4hkY0Wq+eV7iwDhjXA1nB9zCRku5q1j4gOR5ZncsogYQJA4dpsbjxiISKBqNSqlgFEkwsRSOltqZjxCWEACpxz/xUzcnGlrZKnhzWiIbk/6lZMOqU/lHOf+Cqzzf/1W6SL9bweyS46bKQkawmO/qAIeZFj+lbI3//7LZT/NWmdyjn/SyTXP1c/LYACGBzv9fAMBWs7/rpf/tLpP//aFc//uubQ/vWbv4//3an/////////4cLw5R/16y41N//HUoP/////////4M7//i1bf/9yWl62Ct/uDmy60AfbFWVISm/BhVKS0JDWkBzX2RRXNIG7RSEHzjDQLILgMwDUBTxzGz0Uf+kkHsFqLxt/+kTwBONDXf/rRBwgZQyR4o0v7rRJUAghuIHmb/6gt4PpJKf/6ROC5Bwl5JL/+Xv//Wc//9Zp//89//6R7/UjuoPVy4V632gFdi/5M8KAMxE4F5mVpV+uEGEDAJ4A0ZdtCt0EAi65cwBYksbmu9daRryYf9P3VjDLDDmefZQBiokTNPL+6w5uphvPPOURQPbVobfcMMN95vPPuFJDJSBp9W/Usczp89528KSkrkqwXBJmiCCCegmnQZZTBNiaHDRCmm9lpIILTJsJkumDLp0mX/I1//+gXf//QKv//y1//6Z7/D1nlFaMgRoardVPBfCgo0KAyoIhGmmdlxW9UVMCGFiSQphAJdGDDJmjMkEr2BKDNObizXisBI9ZW9AZLtOV0zXpsdCUFK121vmtZ19mKBUHvDNqbRK1DHDQFQ9ZmuVrZa2vEEBUBUWblfZuGuVJBSC06VJWCr2a1VYcPRoqtQzXP9cFCzTX//9flCxyozX/61DXAdH/+4Bk2IDzyXDWf2GgAAAADSDgAAEUmcFX7GIxwAAANIAAAATZQ/lf/2YaHI52O/rBUHmJindz7jSRKDWSJRqA40TMkFDAYKA0TfKBl4VixJVZhsPNZYEPoamKMpMMnl97zozXCC9dHZa7R52YNWtbj1XZho9mS6YnK6E5WMde8KsC1kpMcqlocsnHMUU8C4dFWIsc0cK0hdXCDFooLVKUtpKNaXUKT9dJ1UMoq1yhMPLFM3B1dDLkYLHodEaE+UU2VTXNNBQtlQ0XI5wse95oyga+zaupf/WSNwHmnDCD6g4VFBAgDPUiH/X2w9CB9F+r6W/LIypTTKMp48ayOjTqhUK2K2wnvu36rAnfxZewvIcaNiBeLEfYiRbRp3KBmtdfWvI/f5xm1K7pnELe72vfGsW88eSLuLAhRI0K0+oDJWDFT935Ty0tCgQd38KlM7jVnjz38u97xXfgU9q4tCtrz4xettx66+rbzet4Ff/7gGTuAPUEaVX7TERAAAANIAAAARPlnzntMQ+gAAA0gAAABK5vNIrMWtfcTVn88+YdszvqKpjA2AWj2LFNFKKvr7LRKAwAyJrTODjYIEQQ5n5BwjNAlswUqh43kpMHhmY5EoCGY8azApaMlhwLAUx4UBwYraIgVIpD9+E5wCAmbGxvQqBg0UREFYshWYIBFkEKIpOQWMGLuV3jMYLF+MraeioX8DpFFGHZczoBRsDQzNM/DACNvPL3IZQZjEmXDT4KmfVmBhR2POssuaeN1Ew3Xn8K8XMbDzHxgFBQBAEhUFQoRDhONBkgtVpSBRFMNx5HGI/I4+/cvRqcprT6tdLiMvi0NNc5+6RONrW8opGLDXJZhWiEgZZSRmKpwwzTVN6TbhEu/T/Wv/vwZf+xT3/vWLEbl9vusKeV2rGaK8ARqXUsMsef6XSqq6P/8Yz//+Tb//w7/87vuGH////////////t0o8v+qriP2cd//ugZPKABXZmzn1p4AoAAA0goAABKM4XP/nNggAAADSDAAAAU0J//////////iu//7lXEdU4tQetpw48aIANEZK4mCWKWVKrClRgiFSZNk0wnzZcqWUsEdaJOYjYGZcpDiAeAIBEH5eM2MS/9TqDBgDwhqknS8RI6dLRuaVOlNRjQIUIKQU0dK3Q1Jl0L8gUAWiIotoNtdaJMhoo5B41Pf/YuhMJ5I8dWr+9lh1zrpfWr1s4hGdSf/9y8LPNX//ykRdd//3H0X2//5Yf//zCb+QedpQx8bkAQIJQBQQCAD04Q42xrUCsxQ+Y64KbBQ6wTBBYRmKTZYSLgpRAxFnhYMOeIH6bJpnm+nBumHRC4BlDyjMyWkilQWgTAZcAysdhmnUg39SBqCmnzrpvr22WZhqYXILZogyboJvup0zcGgkms1RNEENaNbOooCNRR0Tqd66X2kMf//pk0hb/+mST//6igV3//5Y/4cXHhDPWeZZCijf7XXvN0lpAyIKsVQQ5gLIzVMwBBKBQtMAgUCJ+MEBnMBweMBAFjxlqTpjMKBhOGQqDbDzAAGTDhYw4VMtPjKn0vcmsDZkaMGCGIDKxoJL6oJiyRfEiLDCRs4hyagslyDBR5y00kNlzBJS6fUxyQAAgyqEu804AgjWmHKm5EhRgEk974pWdQMDkTi9SE9L4qA7tVeRKGZ0z//uAZOqA9M540P9mYAgAAA0g4AABE1nBQfWZAAAAADSCgAAEElMnCH0ZorYqmAHcABrtR+KvzJk9qZ9X5qVXZxKASU5bmgcANlnPa7CYlYbkkNcllPclM7ynjs1afXWSaTza5hfV3GN01Cymmzwu1b0ps009vKt3LK1lf7nkmLDueF6ZWJD+GsauXXaWG+e7Kq76y7v4wzr//f/vmGP/+LrXMc/qRvD//6L/////////+lxxy+gho7V/K4MslWd4Z3Z0KzWVsh3TO41sTylyOqXAyEuoLFi0ngWdWNVrcPAsCWNhutZIGouOk41JJUUoOUTJA/Lnba4PQ2qEk1QeiaGqy7TrjVsIqGx64edpu7dBSpcoHj6znOd6RSz+bYes7ua5vyUk1YoH47dGzknNJJ/+F+TW/hqLUVpqa9zXfDr4de39ySqSLWTX/+7SfERf//8w61Vph3///qnWmpNVTEFNRVVVVaBoSoAACwD/+6Bk9IAJ0HfOfndgAAAADSDAAAAUCcMl/YWAAAAANIOAAASgS3+ToSltcv5gZxUiZCSxEd/////+VLPfnv//9aTp36gqKI+RDVHxKSDiTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk9o/xjQ5EyMATAAAADSAAAAEAAAH+AAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg=="); 

var snd2 = new Audio("data:audio/mpeg;base64,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wzMEBwaYcGgIBLxBc2PC0RotQIv41sxEOM3LDfBQ93PPtACIacyadixGowYqgb3CuUvMO5OwUeTuf40vNlUkmun7O8vpBABNS6gfWzsJ//uQZOsAk3I80PsMM+oMABioAAAAHYkVLe7vESgngGMQAAAAvCpNkKSKJkG2BlTV9qIpclnrtWGQ1/xKD/uLG/VUZiPk+J2gM/BshKyMBwAF8IboIDcQD3bJyiIyraNsdGsCBRMSin6lxmvMdNFUAx/nf3pn4Oujden1lraTg0TSY46nxgHeDyv74x8BrJbEfPz8h9kv6B4n8QJ/8WH/gJtV2eoIDfqEPlKEG/tKQDtsadACyYKjjxAMJDWC9ocsaAx1HIBwaUNEF7OpTuJ7W2kmodf5ziyJEZj1gRoU0onyFxGvTZTlAHJgvuWUhoCxHi3JvUTBBLH9x0oTjX+5hpUTmx8PUHc/+W2Yj6eqYm2GCZ13/CRcAU5IFRnhrd0++YDAmEHaKWwWWDsg0S/hCBjqMpbFMFxEwmlwK81Nauv7EqepJQnUTrMCpKJIgwONJToKrkYSNjcOk4BBQU5W4ajPmtZIjOPHwlUzJxukcqTQCKJXP2tItVdt5fBYTTJJjQklcaLRADEaIABjogDSsW+Nh2Z7MeZIaj///Qzf9HqW//tgZPEA9D49Tnt5jLAAAA/wAAABDGD1Qey9WEAAAD/AAAAEGAi1CgIk68RKfWE3awFAsqRqEoi5FUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tgZOwA83480vsvWugAAA/wAAABDSTjMcwZM6gAAD/AAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZPAP8ZweResMELAAAA/wAAABAAAB/gAAACAAAD/AAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=");   