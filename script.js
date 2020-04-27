// get element location on page
var cs = document.getElementById("circle-set");
var csr = cs.getBoundingClientRect();
csr.center = { 'x': csr.width/2.0 + csr.left,
               'y': csr.height/2.0 + csr.top };
csr.center.string = ""+csr.center.x+"px "+
                       csr.center.y+"px";

// get root element offsets
var rootr = document.body.parentElement.getBoundingClientRect();

// get viewport size
var vp = { "width": window.innerWidth,
           "height": window.innerHeight };

// calculate translate parameters
var t = {};
var scale_factor = 0.8;
t.scale = scale_factor * (vp.height/csr.height);
t.translate = { 
  'x': (rootr.left + (vp.width/2.0 - csr.center.x)),
  'y': (rootr.top + (vp.height/2.0 - csr.center.y)) };
t.translate_w_scale = { 
  'x': t.translate.x - (t.scale * csr.center.x),
  'y': t.translate.y - (t.scale * csr.center.y)};
t.scale_centered = {
  'x': -((csr.center.x * t.scale) - csr.center.x),
  'y': -((csr.center.y * t.scale) - csr.center.y) };

var trans = document.getElementById("translate");
var tands = document.getElementById("translate-scale");
trans.onclick = function() {
   TweenMax.to(document.body, 1, 
               {x: 20, 
                y: 240,
                transformOrigin: csr.center.string,
                scale: 1 });
};
tands.onclick = function() {
    TweenMax.to(document.body, 1, {
      x: t.translate.x,
      y: t.translate.y,
      transformOrigin: csr.center.string,
      scale: t.scale
   });
};

document.body.onclick = function() {
  TweenMax.set(document.body, {x: 0, y: 0, scale: 1})
  TweenMax.set("#s1", {scale: 1});
  TweenMax.set(cs, {x: 0, y: 0, scale: 1});
}