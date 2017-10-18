var idx = $('.nav>.nav-box>li').on('click',function(e) {
  idx = $(this).index()
  $(this).addClass('select')
  $(this).siblings().removeClass('select');
  bbshow = $('.bbshow>ul')[idx]  
  $(bbshow).show();
  $(bbshow).siblings().hide()
  return $(idx)
})
var products = [
  {
    img: '../Images/3.jpeg',
    name: '有点长的商品展示名字',
    price: '￥405.00'
  },{
    img: '../Images/3.jpeg',
    name: '有点长的商品展示名字',
    price: '￥100.00'
  },{
    img: '../Images/3.jpeg',
    name: '有点长的商品展示名字',
    price: '￥45.00'
  }
];
$('.getMore>.btn').on('click', function(e){
  $.each(products, function(index,products) {
    var addtext = getmore(products)
    if ($('.nav-box>li:first').hasClass('select')) {
      $('.bbshow>ul:first').append(addtext)
    }
    $('.bbshow>ul').eq(idx).append(addtext)
  })
})
function getmore(node){
  var addtext = ''
  addtext += '<li class="details">'
  addtext += '<img src='+ node.img +'>'
  addtext += '<div>'
  addtext += '<span>' + node.name + '</span>'
  addtext += '<span class="price">' + node.price + '</span>'
  addtext += '</div>'
  addtext += '<div class = "placeholder"><div>立即抢购</div></div> '
  addtext += '</li>'
  return addtext
}
