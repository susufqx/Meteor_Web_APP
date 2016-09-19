//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Spacebars = Package.spacebars.Spacebars;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Template = Package.templating.Template;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var DDP = Package['ddp-client'].DDP;
var WebApp = Package.webapp.WebApp;
var Mongo = Package.mongo.Mongo;
var HTML = Package.htmljs.HTML;

(function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/mrt_facebook-sdk/packages/mrt_facebook-sdk.js                   //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
(function () {                                                              // 1
                                                                            // 2
///////////////////////////////////////////////////////////////////////     // 3
//                                                                   //     // 4
// packages/mrt:facebook-sdk/sdk.js                                  //     // 5
//                                                                   //     // 6
///////////////////////////////////////////////////////////////////////     // 7
                                                                     //     // 8
(function(d, s, id){                                                 // 1   // 9
 var js, fjs = d.getElementsByTagName(s)[0];                         // 2   // 10
 if (d.getElementById(id)) {return;}                                 // 3   // 11
 js = d.createElement(s); js.id = id;                                // 4   // 12
 js.src = "//connect.facebook.net/fr_FR/all.js";               // 5   // 13
 fjs.parentNode.insertBefore(js, fjs);                               // 6   // 14
}(document, 'script', 'facebook-jssdk'));                            // 7   // 15
                                                                     // 8   // 16
///////////////////////////////////////////////////////////////////////     // 17
                                                                            // 18
}).call(this);                                                              // 19
                                                                            // 20
                                                                            // 21
                                                                            // 22
                                                                            // 23
                                                                            // 24
                                                                            // 25
(function () {                                                              // 26
                                                                            // 27
///////////////////////////////////////////////////////////////////////     // 28
//                                                                   //     // 29
// packages/mrt:facebook-sdk/template.templates.js                   //     // 30
//                                                                   //     // 31
///////////////////////////////////////////////////////////////////////     // 32
                                                                     //     // 33
                                                                     // 1   // 34
Template.__define__("facebookLike", (function() {                    // 2   // 35
  var view = this;                                                   // 3   // 36
  return HTML.DIV({                                                  // 4   // 37
    "class": "fb-like",                                              // 5   // 38
    "data-send": "true",                                             // 6   // 39
    "data-width": function() {                                       // 7   // 40
      return Spacebars.mustache(view.lookup("width"));               // 8   // 41
    },                                                               // 9   // 42
    "data-show-faces": function() {                                  // 10  // 43
      return Spacebars.mustache(view.lookup("faces"));               // 11  // 44
    },                                                               // 12  // 45
    "data-action": function() {                                      // 13  // 46
      return Spacebars.mustache(view.lookup("action"));              // 14  // 47
    },                                                               // 15  // 48
    "data-colorscheme": function() {                                 // 16  // 49
      return Spacebars.mustache(view.lookup("colorscheme"));         // 17  // 50
    },                                                               // 18  // 51
    "data-href": function() {                                        // 19  // 52
      return Spacebars.mustache(view.lookup("href"));                // 20  // 53
    },                                                               // 21  // 54
    "data-kid-directed-site": function() {                           // 22  // 55
      return Spacebars.mustache(view.lookup("kid"));                 // 23  // 56
    },                                                               // 24  // 57
    "data-layout": function() {                                      // 25  // 58
      return Spacebars.mustache(view.lookup("layout"));              // 26  // 59
    },                                                               // 27  // 60
    "data-ref": function() {                                         // 28  // 61
      return Spacebars.mustache(view.lookup("ref"));                 // 29  // 62
    },                                                               // 30  // 63
    "data-share": function() {                                       // 31  // 64
      return Spacebars.mustache(view.lookup("share"));               // 32  // 65
    }                                                                // 33  // 66
  });                                                                // 34  // 67
}));                                                                 // 35  // 68
                                                                     // 36  // 69
Template.__define__("facebookShare", (function() {                   // 37  // 70
  var view = this;                                                   // 38  // 71
  return HTML.DIV({                                                  // 39  // 72
    "class": "fb-share-button",                                      // 40  // 73
    "data-href": function() {                                        // 41  // 74
      return Spacebars.mustache(view.lookup("href"));                // 42  // 75
    },                                                               // 43  // 76
    "data-type": function() {                                        // 44  // 77
      return Spacebars.mustache(view.lookup("type"));                // 45  // 78
    },                                                               // 46  // 79
    "data-width": function() {                                       // 47  // 80
      return Spacebars.mustache(view.lookup("width"));               // 48  // 81
    }                                                                // 49  // 82
  });                                                                // 50  // 83
}));                                                                 // 51  // 84
                                                                     // 52  // 85
Template.__define__("facebookPost", (function() {                    // 53  // 86
  var view = this;                                                   // 54  // 87
  return HTML.DIV({                                                  // 55  // 88
    "class": "fb-post",                                              // 56  // 89
    "data-href": function() {                                        // 57  // 90
      return Spacebars.mustache(view.lookup("href"));                // 58  // 91
    },                                                               // 59  // 92
    "data-width": function() {                                       // 60  // 93
      return Spacebars.mustache(view.lookup("width"));               // 61  // 94
    }                                                                // 62  // 95
  });                                                                // 63  // 96
}));                                                                 // 64  // 97
                                                                     // 65  // 98
Template.__define__("facebookComments", (function() {                // 66  // 99
  var view = this;                                                   // 67  // 100
  return HTML.DIV({                                                  // 68  // 101
    "class": "fb-comments",                                          // 69  // 102
    "data-href": function() {                                        // 70  // 103
      return Spacebars.mustache(view.lookup("href"));                // 71  // 104
    },                                                               // 72  // 105
    "data-numposts": function() {                                    // 73  // 106
      return Spacebars.mustache(view.lookup("num_posts"));           // 74  // 107
    },                                                               // 75  // 108
    "data-colorscheme": function() {                                 // 76  // 109
      return Spacebars.mustache(view.lookup("colorscheme"));         // 77  // 110
    },                                                               // 78  // 111
    "data-width": function() {                                       // 79  // 112
      return Spacebars.mustache(view.lookup("width"));               // 80  // 113
    },                                                               // 81  // 114
    "data-order-by": function() {                                    // 82  // 115
      return Spacebars.mustache(view.lookup("order_by"));            // 83  // 116
    },                                                               // 84  // 117
    "data-mobile": function() {                                      // 85  // 118
      return Spacebars.mustache(view.lookup("mobile"));              // 86  // 119
    }                                                                // 87  // 120
  });                                                                // 88  // 121
}));                                                                 // 89  // 122
                                                                     // 90  // 123
Template.__define__("facebookSend", (function() {                    // 91  // 124
  var view = this;                                                   // 92  // 125
  return HTML.DIV({                                                  // 93  // 126
    "class": "fb-send",                                              // 94  // 127
    "data-href": function() {                                        // 95  // 128
      return Spacebars.mustache(view.lookup("href"));                // 96  // 129
    },                                                               // 97  // 130
    "data-colorscheme": function() {                                 // 98  // 131
      return Spacebars.mustache(view.lookup("colorscheme"));         // 99  // 132
    },                                                               // 100
    "data-kid-directed-site": function() {                           // 101
      return Spacebars.mustache(view.lookup("kid_directed_site"));   // 102
    },                                                               // 103
    "data-ref": function() {                                         // 104
      return Spacebars.mustache(view.lookup("ref"));                 // 105
    }                                                                // 106
  });                                                                // 107
}));                                                                 // 108
                                                                     // 109
Template.__define__("facebookFollow", (function() {                  // 110
  var view = this;                                                   // 111
  return HTML.DIV({                                                  // 112
    "class": "fb-follow",                                            // 113
    "data-href": function() {                                        // 114
      return Spacebars.mustache(view.lookup("href"));                // 115
    },                                                               // 116
    "data-colorscheme": function() {                                 // 117
      return Spacebars.mustache(view.lookup("colorscheme"));         // 118
    },                                                               // 119
    "data-layout": function() {                                      // 120
      return Spacebars.mustache(view.lookup("layout"));              // 121
    },                                                               // 122
    "data-show-faces": function() {                                  // 123
      return Spacebars.mustache(view.lookup("faces"));               // 124
    }                                                                // 125
  });                                                                // 126
}));                                                                 // 127
                                                                     // 128
Template.__define__("facebookActivity", (function() {                // 129
  var view = this;                                                   // 130
  return HTML.DIV({                                                  // 131
    "class": "fb-activity",                                          // 132
    "data-site": function() {                                        // 133
      return Spacebars.mustache(view.lookup("site"));                // 134
    },                                                               // 135
    "data-action": function() {                                      // 136
      return Spacebars.mustache(view.lookup("action"));              // 137
    },                                                               // 138
    "data-colorscheme": function() {                                 // 139
      return Spacebars.mustache(view.lookup("colorscheme"));         // 140
    },                                                               // 141
    "data-header": function() {                                      // 142
      return Spacebars.mustache(view.lookup("header"));              // 143
    },                                                               // 144
    "data-filter": function() {                                      // 145
      return Spacebars.mustache(view.lookup("filter"));              // 146
    },                                                               // 147
    "data-linktarget": function() {                                  // 148
      return Spacebars.mustache(view.lookup("linktarget"));          // 149
    },                                                               // 150
    "data-recommendations": function() {                             // 151
      return Spacebars.mustache(view.lookup("recommendations"));     // 152
    },                                                               // 153
    "data-ref": function() {                                         // 154
      return Spacebars.mustache(view.lookup("ref"));                 // 155
    },                                                               // 156
    "data-width": function() {                                       // 157
      return Spacebars.mustache(view.lookup("width"));               // 158
    }                                                                // 159
  });                                                                // 160
}));                                                                 // 161
                                                                     // 162
Template.__define__("facebookRecommendations", (function() {         // 163
  var view = this;                                                   // 164
  return HTML.DIV({                                                  // 165
    "class": "fb-recommendations",                                   // 166
    "data-site": function() {                                        // 167
      return Spacebars.mustache(view.lookup("site"));                // 168
    },                                                               // 169
    "data-action": function() {                                      // 170
      return Spacebars.mustache(view.lookup("action"));              // 171
    },                                                               // 172
    "data-colorscheme": function() {                                 // 173
      return Spacebars.mustache(view.lookup("colorscheme"));         // 174
    },                                                               // 175
    "data-header": function() {                                      // 176
      return Spacebars.mustache(view.lookup("header"));              // 177
    },                                                               // 178
    "data-add-id": function() {                                      // 179
      return Spacebars.mustache(view.lookup("add_id"));              // 180
    },                                                               // 181
    "data-height": function() {                                      // 182
      return Spacebars.mustache(view.lookup("height"));              // 183
    },                                                               // 184
    "data-linktarget": function() {                                  // 185
      return Spacebars.mustache(view.lookup("linktarget"));          // 186
    },                                                               // 187
    "data-ref": function() {                                         // 188
      return Spacebars.mustache(view.lookup("ref"));                 // 189
    },                                                               // 190
    "data-width": function() {                                       // 191
      return Spacebars.mustache(view.lookup("width"));               // 192
    }                                                                // 193
  });                                                                // 194
}));                                                                 // 195
                                                                     // 196
///////////////////////////////////////////////////////////////////////     // 230
                                                                            // 231
}).call(this);                                                              // 232
                                                                            // 233
//////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:facebook-sdk'] = {};

})();
