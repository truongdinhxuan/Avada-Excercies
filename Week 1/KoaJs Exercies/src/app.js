const Koa = require('koa');
const render = require('koa-ejs')
const path = require('path')
const koaBody = require('koa-body');
const koaBodyParser = require('koa-bodyparser')
const routes = require('../routes/routes');

const app = new Koa()

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  // debug: true
})

app.use(koaBody());
app.use(koaBodyParser())
app.use(routes.routes());
app.use(routes.allowedMethods());


console.log(`                                             
                       _oo0oo_                           
                      o8888888o                          
                      88" . "88                          
                      (| -_- |)                          
                      0\\  =  /0                          
                    ___/\\\`---'\\___                        
                  .' \\\\|     |// '.                      
                 / \\\\|||  :  |||// \\\\                     
                / _||||| -:- |||||- \\\\                    
               |   | \\\\\\  -  /// |   |                   
               | \\\\_|  ''\\---/''  |_/ |                   
               \\\\  .-\\__  '-'  ___/-. /                   
             ___'. .'  /--.--\\  \`. .'___                 
          ."" '<  \`.___\\_<|>_/___.\\' >' "".               
         | | :  \`- \\\`.;\\\`\\ _ /\\\`;.\`/ - \` : | |             
         \\\\  \\\\ \`_.   \\\\_ __\\ /__ _/   .-\\\` /  /             
     =====\`-.____\`.___ \\\\_____/___.-\\\`___.-'=====          
                       \`=---='                           
                                                        
                                                        
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~         
                                                        
  KHÔNG BUG!        KHÔNG CRASH!        DỄ DÀNG!      
                                                        
                    A DI ĐÀ PHẬT!                        
`)

app.listen(5000);