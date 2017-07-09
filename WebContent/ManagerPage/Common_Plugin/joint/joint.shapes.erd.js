/*! JointJS v0.9.3 - JavaScript diagramming library  2015-02-03 


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
if (typeof exports === 'object') {

    var joint = {
        util: require('../src/core').util,
        shapes: {},
        dia: {
            Element: require('../src/joint.dia.element').Element,
            Link: require('../src/joint.dia.link').Link
        }
    };
}


joint.shapes.erd = {};

joint.shapes.erd.Entity = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'erd.Entity',
        size: { width: 150, height: 60 },
        attrs: {
            '.outer': {
                fill: '#2ECC71', stroke: '#27AE60', 'stroke-width': 2,
                points: '100,0 100,60 0,60 0,0'
            },
           
            text: {
                text: 'Entity',
                'font-family': 'Arial', 'font-size': 14,
                ref: '.outer', 'ref-x': .5, 'ref-y': .5,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.erd.WeakEntity = joint.shapes.erd.Entity.extend({

    defaults: joint.util.deepSupplement({

        type: 'erd.WeakEntity',

        attrs: {
            '.inner' : { display: 'auto' },
            text: { text: 'Weak Entity' }
        }

    }, joint.shapes.erd.Entity.prototype.defaults)
});

joint.shapes.erd.Relationship = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',
    
    defaults: joint.util.deepSupplement({

        type: 'erd.Relationship',
        size: { width: 80, height: 80 },
        attrs: {
            '.outer': {
                fill: '#3498DB', stroke: '#2980B9', 'stroke-width': 2,
                points: '40,0 80,40 40,80 0,40'
            },
            '.inner': {
                fill: '#3498DB', stroke: '#2980B9', 'stroke-width': 2,
                points: '40,5 75,40 40,75 5,40',
                display: 'none'
            },
            text: {
                text: 'Relationship',
                'font-family': 'Arial', 'font-size': 12,
                ref: '.', 'ref-x': .5, 'ref-y': .5,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.erd.IdentifyingRelationship = joint.shapes.erd.Relationship.extend({

    defaults: joint.util.deepSupplement({

        type: 'erd.IdentifyingRelationship',

        attrs: {
            '.inner': { display: 'auto' },
            text: { text: 'Identifying' }
        }

    }, joint.shapes.erd.Relationship.prototype.defaults)
});


joint.shapes.erd.Attribute = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><ellipse class="outer"/><ellipse class="inner"/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'erd.Attribute',
        size: { width: 100, height: 50 },
        attrs: {
            'ellipse': {
                transform: 'translate(50, 25)'
            },
            '.outer': {
                stroke: '#D35400', 'stroke-width': 2,
                cx: 0, cy: 0, rx: 50, ry: 25,
                fill: '#E67E22'
            },
            '.inner': {
                stroke: '#D35400', 'stroke-width': 2,
                cx: 0, cy: 0, rx: 45, ry: 20,
                fill: '#E67E22', display: 'none'
            },
            text: {
                 'font-family': 'Arial', 'font-size': 14,
                 ref: '.', 'ref-x': .5, 'ref-y': .5,
                 'x-alignment': 'middle', 'y-alignment': 'middle'
             }
         }

     }, joint.dia.Element.prototype.defaults)

 });

joint.shapes.erd.database = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><path class="database"/></g><text/></g>',
    
defaults: joint.util.deepSupplement({

        type: 'erd.database',
        size: { width: 240, height: 74 },
        attrs: {
            '.database': {
            	d:'m389.050018,120.793701c0,6.626953 -53.503052,11.999786 -119.500854,11.999786m119.500854,-11.999786l0,0c0,6.626953 -53.503052,11.999786 -119.500854,11.999786c-65.997849,0 -119.499161,-5.372833 -119.499161,-11.999786m0,0l0,0c0,-6.627502 53.501312,-12.000366 119.499161,-12.000366c65.997803,0 119.500854,5.372864 119.500854,12.000366l0,47.999832c0,6.627487 -53.503052,11.999802 -119.500854,11.999802c-65.997849,0 -119.499161,-5.372314 -119.499161,-11.999802l0,-47.999832z',
                stroke: '#664141', 'stroke-width': 0.1,
                'fill-opacity':'null','stroke-opacity':'null',
                fill: '#64AFE5'
            },
            text: {
                 'font-family': 'Arial', 'font-size': 14,
                 ref: '.', 'ref-x': .5, 'ref-y': .5,
                 'x-alignment': 'middle', 'y-alignment': 'middle'
             }
         }

     }, joint.dia.Element.prototype.defaults)

 });


joint.shapes.erd.Members = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"> <rect class="members" /></g><text/></g>',
    defaults: joint.util.deepSupplement({

        type: 'erd.Attribute',
        size: { width: 124, height: 155 },
        attrs: {
            'ellipse': {
                transform: 'translate(50, 25)'
            },
            '.members': {
                stroke: '#000000', 'stroke-width': 1.5,
                height:155, width: 124,
                fill: '#5cb85c'
            },
            text: {
                 'font-family': 'Arial', 'font-size': 14,
                 ref: '.', 'ref-x': .5, 'ref-y': .34,'fill':"#fff",
                 'x-alignment': 'middle', 'y-alignment': 'middle'
             }
         }

     }, joint.dia.Element.prototype.defaults)

 });
joint.shapes.erd.Members2 = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"> <rect class="members" /></g><text/></g>',
    defaults: joint.util.deepSupplement({

        type: 'erd.Attribute',
        size: { width: 124, height: 155 },
        attrs: {
            'ellipse': {
                transform: 'translate(50, 25)'
            },
            '.members': {
                stroke: '#000000', 'stroke-width': 1.5,
                height:155, width: 124,
                fill: '#f0ad4e'
            },
            text: {
                 'font-family': 'Arial', 'font-size': 14,
                 ref: '.', 'ref-x': .5, 'ref-y': .34,'fill':"#fff",
                 'x-alignment': 'middle', 'y-alignment': 'middle'
             }
         }

     }, joint.dia.Element.prototype.defaults)

 });



joint.shapes.erd.CF = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"> <rect class="CF" /></g><text/></g>',
    defaults: joint.util.deepSupplement({

        type: 'erd.Attribute',
        size: { width: 124, height: 105 },
        attrs: {
            'ellipse': {
                transform: 'translate(50, 25)'
            },
            '.CF': {
                stroke: '#000000', 'stroke-width': 1.5,
                height:105, width: 102,
                fill: '#428bca'
            },
            text: {
                 'font-family': 'Arial', 'font-size': 14,
                 ref: '.', 'ref-x': .5, 'ref-y': .5,'fill':"#fff",
                 'x-alignment': 'middle', 'y-alignment': 'middle'
             }
         }

     }, joint.dia.Element.prototype.defaults)

 });


joint.shapes.erd.CF2 = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"> <rect class="CF" /></g><text/></g>',
    defaults: joint.util.deepSupplement({

        type: 'erd.Attribute',
        size: { width: 124, height: 105 },
        attrs: {
            'ellipse': {
                transform: 'translate(50, 25)'
            },
            '.CF': {
                stroke: '#000000', 'stroke-width': 1.5,
                height:105, width: 102,
                fill: '#f0ad4e'
            },
            text: {
                 'font-family': 'Arial', 'font-size': 14,
                 ref: '.', 'ref-x': .5, 'ref-y': .5,'fill':"#fff",
                 'x-alignment': 'middle', 'y-alignment': 'middle'
             }
         }

     }, joint.dia.Element.prototype.defaults)

 });



 joint.shapes.erd.Derived = joint.shapes.erd.Attribute.extend({

     defaults: joint.util.deepSupplement({

         type: 'erd.Derived',

         attrs: {
             '.outer': { 'stroke-dasharray': '3,5' },
             text: { text: 'derived' }
         }

     }, joint.shapes.erd.Attribute.prototype.defaults)
 });

 joint.shapes.erd.Key = joint.shapes.erd.Attribute.extend({

     defaults: joint.util.deepSupplement({

         type: 'erd.Key',

         attrs: {
             ellipse: { 'stroke-width': 4 },
             text: { text: 'key', 'font-weight': '800', 'text-decoration': 'underline' }
         }
     }, joint.shapes.erd.Attribute.prototype.defaults)
});

joint.shapes.erd.Normal = joint.shapes.erd.Attribute.extend({

    defaults: joint.util.deepSupplement({

        type: 'erd.Normal',

        attrs: { text: { text: 'Normal' }}

    }, joint.shapes.erd.Attribute.prototype.defaults)
});

joint.shapes.erd.ISA = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'erd.ISA',
        size: { width: 100, height: 50 },
        attrs: {
            polygon: {
                points: '0,0 50,50 100,0',
                fill: '#F1C40F', stroke: '#F39C12', 'stroke-width': 2
            },
            text: {
                text: 'ISA', 'font-size': 18,
                ref: 'polygon', 'ref-x': .5, 'ref-y': .3,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        }

    }, joint.dia.Element.prototype.defaults)

});

joint.shapes.erd.Line = joint.dia.Link.extend({

    defaults: { type: "erd.Line" },
    
    
    cardinality: function(value) {
        this.set('labels', [{ position: -20, attrs: { text: { dy: -8, text: value }}}]);
    }
});

joint.shapes.erd.Line2 = joint.dia.Link.extend({

    defaults: { type: "erd.Line" },
    markup: [
             '<path class="connection" stroke="black"/>',
             '<path class="marker-source" fill="black" stroke="black" />',
             '<path class="marker-target" fill="black" stroke="black" />',
             '<g class="labels"/>',
             '<g class="marker-vertices"/>',
             '<g class="marker-arrowheads" style="opacity: 1;"/>'
         ].join(''),
    cardinality: function(value) {
        this.set('labels', [{ position: -20, attrs: { text: { dy: -8, text: value }}}]);
    }
});


if (typeof exports === 'object') {
    module.exports = joint.shapes.erd;
}
