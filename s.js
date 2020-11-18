const express = require('express'); // express 모듈 추가하기
const http = require('http');
const app = express();
const port = 3030;
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
var database;
var router = express.Router();
var static = require('serve-static');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSesstion = require('express-session');
var myname="null";
var back;
var page;
var nhname;
var nhemail;
var nhtelephone;
var nhschool;
var quiz1;
var quiz2;
var quiz3;
var quiz4;
var quiz5;
var quiz1per;
var quiz2per;
var quiz3per;
var quiz4per;
var quiz5per;
var avg1=0, avg2=0, avg3=0, avg4=0,avg5=0;
var quiz1avg;      
var quiz2avg; 
var quiz3avg; 
var quiz4avg; 
var quiz5avg;   
var quizCorrect=0;
var myCheck=0;



/*app.use('/css',static(path.join(__dirname, 'css')));
app.use('/bootstrap',static(path.join(__dirname, 'bootstrap')));
app.use('/img',static(path.join(__dirname, 'img')));
app.use('/js',static(path.join(__dirname, 'js')));
app.use('/font-awesome',static(path.join(__dirname, 'font-awesome')));*/

var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul")

app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + '/views');
app.set('view engine','ejs');


var socket= require('socket.io');
var cors = require('cors');

app.use(cors());
app.use('/css',express.static('css'));
app.use('/bootstrap',express.static('bootstrap'));
app.use('/img',express.static('img'));
app.use('/js',express.static('js'));
app.use('/font-awesome',express.static('font-awesome'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/page-chatting', function(request, response) {
   
    var context = {myid: nhname,name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
    
    back='page-chatting';
    request.app.render('page-chatting',context, function(err,html){
        if(err){
            console.error('뷰 렌더링 중 오류 발생:' + err.stack);
  
            response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
            response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            response.write('<p>'+err.stack+'</p>');
            response.end();
  
            return;
        }
        
  
        response.end(html);
    });
  });




app.get('/', function(request, response) {

    
    var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
    back='page-home';
    request.app.render('page-home',context, function(err,html){
        if(err){
            console.error('뷰 렌더링 중 오류 발생:' + err.stack);
  
            response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
            response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            response.write('<p>'+err.stack+'</p>');
            response.end();
  
            return;
        }
        //console.log('rendered: ' + html);
  
        response.end(html);
    });
  });
  
  app.get('/page-home', function(request, response) {
   
    back='page-home';
    var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
      request.app.render('page-home',context, function(err,html){
          if(err){
              console.error('뷰 렌더링 중 오류 발생:' + err.stack);
    
              response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
              response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
              response.write('<p>'+err.stack+'</p>');
              response.end();
    
              return;
          }
          //console.log('rendered: ' + html);
    
          response.end(html);
      });
    });

      app.get('/page-intro', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
      back='page-intro';
      request.app.render('page-intro',context, function(err,html){
          if(err){
              console.error('뷰 렌더링 중 오류 발생:' + err.stack);
    
              response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
              response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
              response.write('<p>'+err.stack+'</p>');
              response.end();
    
              return;
          }
          //console.log('rendered: ' + html);
    
          response.end(html);
      });
    });

    app.get('/page-prestudy1', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-prestudy1';
        request.app.render('page-prestudy1',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/page-prestudy2', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-prestudy2';
        request.app.render('page-prestudy2',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/page-study-prepare', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-study-prepare';
        request.app.render('page-study-prepare',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
           
      
            response.end(html);
        });
      });

      app.get('/page-study-air', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-study-air';
        request.app.render('page-study-air',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
           
      
            response.end(html);
        });
      });

      app.get('/page-study-experiment', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-study-experiment';
        request.app.render('page-study-experiment',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/page-study-kalium', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-study-kalium';
        request.app.render('page-study-kalium',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });


      app.get('/page-study-lithium', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-study-lithium';
        request.app.render('page-study-lithium',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/page-study-natrium', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-study-natrium';
        request.app.render('page-study-natrium',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
           
      
            response.end(html);
        });
      });


      app.get('/page-study-test1', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-study-test1';
        request.app.render('page-study-test1',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });


      app.get('/page-study-test2', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-study-test2';
        request.app.render('page-study-test2',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
           
      
            response.end(html);
        });
      });

      app.get('/page-study-test3', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-study-test3';
        request.app.render('page-study-test3',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });


      app.get('/page-study-test-result', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        request.app.render('page-study-test-result',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/page-pre-quiz', function(request, response) {
   
        if(quizCorrect>=70){
            myCheck=1;
        }
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};
        back='page-pre-quiz';
        if(myname=='null'){
            response.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
            response.write("<script>alert('로그인 후 사용 가능합니다'); </script>");
            request.app.render('page-login',context, function(err,html){
                if(err){
                    console.error('뷰 렌더링 중 오류 발생:' + err.stack);
          
                    response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                    response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                    response.write('<p>'+err.stack+'</p>');
                    response.end();
          
                    return;
                }
                
          
                response.end(html);
            });
        }
        else{
        request.app.render('page-pre-quiz',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });}
      });


     
          /* 여기서 부터 퀴즈 시작*/  

          app.post('/page-quiz-score', function(request,response){
            var params = request.body;
            var myTime=moment().format('YYYY-MM-DD HH:mm:ss');
            var context = {name: myname};
            var paramId = nhname;
            var quizScore=0;
            var quiz1Arr = [];
            var quiz2Arr = [];
            var quiz3Arr = [];
            console.log(request.body.quizNum);


            if(request.body.quizNum==1){
                for(var keyNum in params){
                    if(keyNum.indexOf('quiz1')>-1){
                        quiz1Arr.push(params[keyNum]);
                        console.log("1번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option4'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz2')>-1){
                        quiz2Arr.push(params[keyNum]);
                        console.log("2번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option4'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz3')>-1){
                        quiz3Arr.push(params[keyNum]);
                        console.log("3번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option1'){
                            quizScore++;
                        }
                    }
                }
                
            }    
            else if(request.body.quizNum==2){
                for(var keyNum in params){
                    if(keyNum.indexOf('quiz1')>-1){
                        quiz1Arr.push(params[keyNum]);
                        console.log("1번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option5'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz2')>-1){
                        quiz2Arr.push(params[keyNum]);
                        console.log("2번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option3'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz3')>-1){
                        quiz3Arr.push(params[keyNum]);
                        console.log("3번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option3'){
                            quizScore++;
                        }
                    }
                }
            }
            else if(request.body.quizNum==3){
                for(var keyNum in params){
                    if(keyNum.indexOf('quiz1')>-1){
                        quiz1Arr.push(params[keyNum]);
                        console.log("1번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option4'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz2')>-1){
                        quiz2Arr.push(params[keyNum]);
                        console.log("2번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option2'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz3')>-1){
                        quiz3Arr.push(params[keyNum]);
                        console.log("3번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option2'){
                            quizScore++;
                        }
                    }
                }
            }
            else if(request.body.quizNum==4){
                for(var keyNum in params){
                    if(keyNum.indexOf('quiz1')>-1){
                        quiz1Arr.push(params[keyNum]);
                        console.log("1번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option4'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz2')>-1){
                        quiz2Arr.push(params[keyNum]);
                        console.log("2번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option2'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz3')>-1){
                        quiz3Arr.push(params[keyNum]);
                        console.log("3번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option4'){
                            quizScore++;
                        }
                    }
                }
            }
            else if(request.body.quizNum==5){
                for(var keyNum in params){
                    if(keyNum.indexOf('quiz1')>-1){
                        quiz1Arr.push(params[keyNum]);
                        console.log("1번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option2'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz2')>-1){
                        quiz2Arr.push(params[keyNum]);
                        console.log("2번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option4'){
                            quizScore++;
                        }
                    }
                    if(keyNum.indexOf('quiz3')>-1){
                        quiz3Arr.push(params[keyNum]);
                        console.log("3번 문제 답 : "+params[keyNum]);
                        if(params[keyNum]=='option1'){
                            quizScore++;
                        }
                    }
                }
            }


            if(quizScore==0){
                myQuizPer=0;
            }
            else if(quizScore==1){
                myQuizPer=33.33;
            }
            else if(quizScore==2){
                myQuizPer=66.66;
            }
            else if(quizScore==3){
                myQuizPer=100.00;
            }
    
            console.log(quizScore+" "+myQuizPer);
            if(request.body.quizNum==1){
                quiz1=quizScore;
                quiz1per=myQuizPer;
            }
            else if(request.body.quizNum==2){
                quiz2=quizScore;
                quiz2per=myQuizPer;
            }
            else if(request.body.quizNum==3){
                quiz3=quizScore;
                quiz3per=myQuizPer;
            }
            else if(request.body.quizNum==4){
                quiz4=quizScore;
                quiz4per=myQuizPer;
            }
            else if(request.body.quizNum==5){
                quiz5=quizScore;
                quiz5per=myQuizPer;
            }

            quizCorrect=quiz1per+quiz2per+quiz3per+quiz4per+quiz5per;
            quizCorrect=quizCorrect/5;
            quizCorrect=quizCorrect.toFixed(2);

            var num = request.body.quizNum;
    
            if(database){
                addWebQuizScore(database, paramId, quizScore, num, function(err, result){
                    if(err){throw err;}
        
                    if(result){
                        var context = {name: myname, myquizScore: quizScore, quizPer: myQuizPer, quizTime: myTime};
                        request.app.render('page-quiz-score',context, function(err,html){
                            avgQuiz();
                            if(err){
                                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
        
                                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                                response.write('<p>'+err.stack+'</p>');
                                response.end();
        
                                return;
                            }
                            
        
                            response.end(html);
                        });
                    }
                    else{
                        response.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                        console.log('점수 입력 오류.');
                    }
                    });
                }
        });            

    app.get('/page-quiz', function(request, response) {
   
        if(quizCorrect>=70){
            myCheck=1;
        }
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};var context = {name: myname};
        back='page-quiz';
        var ht=request.headers.referer;
        console.log(request.headers.referer);
        var element = ht.substr(22);
        console.log(element);
        if(element=='login' || element=='page-pre-quiz'){
        request.app.render('page-quiz',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
        }
    });

      

      app.get('/page-quiz2', function(request, response) {
   
        if(quizCorrect>=70){
            myCheck=1;
        }
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};
        back='page-quiz2';
        var ht=request.headers.referer;
        console.log(request.headers.referer);
        var element = ht.substr(22);
        console.log(element);
        if(element=='login' || element=='page-pre-quiz'){
        request.app.render('page-quiz2',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
    }

      });


    app.get('/page-quiz3', function(request, response) {
   
        if(quizCorrect>=70){
            myCheck=1;
        }
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};
        back='page-quiz3';
        var ht=request.headers.referer;
        console.log(request.headers.referer);
        var element = ht.substr(22);
        console.log(element);
        if(element=='login' || element=='page-pre-quiz'){
        request.app.render('page-quiz3',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
           
      
            response.end(html);
        });
    }

    });


    app.get('/page-quiz4', function(request, response) {
   
        if(quizCorrect>=70){
            myCheck=1;
        }
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};
        back='page-quiz4';
        var ht=request.headers.referer;
        console.log(request.headers.referer);
        var element = ht.substr(22);
        console.log(element);
        if(element=='login' || element=='page-pre-quiz'){
        request.app.render('page-quiz4',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
    }

    });


    app.get('/page-quiz5', function(request, response) {
   
        if(quizCorrect>=70){
            myCheck=1;
        }
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};
        back='page-quiz5';
        var ht=request.headers.referer;
        console.log(request.headers.referer);
        var element = ht.substr(22);
        console.log(element);
        if(element=='login' || element=='page-pre-quiz'){
        request.app.render('page-quiz5',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
    }
    
    }); 

      

      app.get('/insert-page-test1', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='insert-page-test1';
        request.app.render('insert-page-test1',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/insert-page-test2', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='insert-page-test2';
        request.app.render('insert-page-test2',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/insert-page-test3', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='insert-page-test3';
        request.app.render('insert-page-test3',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });


      app.get('/page-chart', function(request, response) {

        var quiz1code ="height : "+quiz1per+"%";
        var quiz2code ="height : "+quiz2per+"%";
        var quiz3code ="height : "+quiz3per+"%";
        var quiz4code ="height : "+quiz4per+"%";
        var quiz5code ="height : "+quiz5per+"%";
        
        var quiz1codeScore ="width : "+quiz1per+"%";
        var quiz2codeScore ="width : "+quiz2per+"%";
        var quiz3codeScore ="width : "+quiz3per+"%";
        var quiz4codeScore ="width : "+quiz4per+"%";
        var quiz5codeScore ="width : "+quiz5per+"%";

        if(quiz1==0){
            var quiz1codeInco ="width : "+100.00+"%";
            var inco1 = 3;
        }
        else if(quiz1==1){
            var quiz1codeInco ="width : "+66.66+"%";
            var inco1 = 2;
        }
        else if(quiz1==2){
            var quiz1codeInco ="width : "+33.33+"%";
            var inco1 = 1;
        }
        else if(quiz1==3){
            var quiz1codeInco ="width : "+0+"%";
            var inco1 = 0;
        }

        if(quiz2==0){
            var quiz2codeInco ="width : "+100+"%";
            var inco2 = 3;
        }
        else if(quiz2==1){
            var quiz2codeInco ="width : "+66.66+"%";
            var inco2 = 2;
        }
        else if(quiz2==2){
            var quiz2codeInco ="width : "+33.33+"%";
            var inco2 = 1;
        }
        else if(quiz2==3){
            var quiz2codeInco ="width : "+0+"%";
            var inco2 = 0;
        }
        
        if(quiz3==0){
            var quiz3codeInco ="width : "+100+"%";
            var inco3 = 3;
        }
        else if(quiz3==1){
            var quiz3codeInco ="width : "+66.66+"%";
            var inco3 = 2;
        }
        else if(quiz3==2){
            var quiz3codeInco ="width : "+33.33+"%";
            var inco3 = 1;
        }
        else if(quiz3==3){
            var quiz3codeInco ="width : "+0+"%";
            var inco3 = 0;
        }

        if(quiz4==0){
            var quiz4codeInco ="width : "+100+"%";
            var inco4 = 3;
        }
        else if(quiz4==1){
            var quiz4codeInco ="width : "+66.66+"%";
            var inco4 = 2;
        }
        else if(quiz4==2){
            var quiz4codeInco ="width : "+33.33+"%";
            var inco4 = 1;
        }
        else if(quiz4==3){
            var quiz4codeInco ="width : "+0+"%";
            var inco4 = 0;
        }

        if(quiz5==0){
            var quiz5codeInco ="width : "+100+"%";
            var inco5 = 3;
        }
        else if(quiz5==1){
            var quiz5codeInco ="width : "+66.66+"%";
            var inco5 = 2;
        }
        else if(quiz5==2){
            var quiz5codeInco ="width : "+33.33+"%";
            var inco5 = 1;
        }
        else if(quiz5==3){
            var quiz5codeInco ="width : "+0+"%";
            var inco5 = 0;
        }
        

        

   

        console.log(quiz4avg);

        if(quizCorrect>=70){
            myCheck=1;
        }
        

        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool , quiz : quizCorrect, check : myCheck, chart1bar : quiz1code, chart2bar:quiz2code, chart3bar:quiz3code, chart4bar:quiz4code, chart5bar:quiz5code,
            chart1prog: quiz1codeScore, chart2prog: quiz2codeScore, chart3prog: quiz3codeScore, chart4prog: quiz4codeScore, chart5prog: quiz5codeScore,
            chart1in: quiz1codeInco, chart2in: quiz2codeInco, chart3in: quiz3codeInco, chart4in: quiz4codeInco, chart5in: quiz5codeInco,
            coNum1 : quiz1per, coNum2 : quiz2per, coNum3 : quiz3per, coNum4 : quiz4per, coNum5 : quiz5per, 
            incoNum1 : inco1, incoNum2 : inco2, incoNum3 : inco3, incoNum4 : inco4, incoNum5 : inco5,
            chart1avg : quiz1avg, chart2avg : quiz2avg, chart3avg : quiz3avg, chart4avg : quiz4avg, chart5avg : quiz5avg
        };
        back='page-chart';
        if(myname=='null'){
            response.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
            response.write("<script>alert('로그인 후 사용 가능합니다'); </script>");
            request.app.render('page-login',context, function(err,html){
                if(err){
                    console.error('뷰 렌더링 중 오류 발생:' + err.stack);
          
                    response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                    response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                    response.write('<p>'+err.stack+'</p>');
                    response.end();
          
                    return;
                }
                
          
                response.end(html);
            });
        }
        else{
        request.app.render('page-chart',context, function(err,html){

            //var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool}
            console.log("start");
            
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });}
      });


      app.get('/page-support', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-support';
        request.app.render('page-support',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/page-faq1', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-faq1';
        request.app.render('page-faq1',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
           
      
            response.end(html);
        });
      });

      app.get('/page-faq2', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-faq2';
        request.app.render('page-faq2',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/page-faq3', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-faq3';
        request.app.render('page-faq3',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
           
      
            response.end(html);
        });
      });

      app.get('/page-faq4', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-faq4';
        request.app.render('page-faq4',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
           
      
            response.end(html);
        });
      });

      app.get('/page-faq5', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        back='page-faq5';
        request.app.render('page-faq5',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
            
      
            response.end(html);
        });
      });

      app.get('/page-mypage', function(request, response) {
   
        
        if(quizCorrect>=70){
            myCheck=1;
        }
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};
        back='page-mypage';
        request.app.render('page-mypage',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
      
            response.end(html);
        });
      });

      app.get('/login', function(request, response) {
   
        
        if(quizCorrect>=70){
            myCheck=1;
        }
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};
            request.app.render('page-login',context, function(err,html){
                if(err){
                    console.error('뷰 렌더링 중 오류 발생:' + err.stack);
          
                    response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                    response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                    response.write('<p>'+err.stack+'</p>');
                    response.end();
          
                    return;
                }
                
          
                response.end(html);
            });
      });

      


      app.get('/page-adduser', function(request, response) {
   
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool};
        request.app.render('page-adduser',context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
      
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
           
      
            response.end(html);
        });
      });

      app.get('/page-logout', function(request, response) {
   
        myname="null"
        
        var ht=request.headers.referer;
        console.log(request.headers.referer);
        var element = ht.substr(22);
        console.log(element);
        if(element=='login'){
            element=back;
        }
        if(quizCorrect>=70){
            myCheck=1;
        }
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};

        if(element=='page-pre-quiz' || element== 'page-chart' || element=='page-mypage'
        || element=='page-quiz' || element=='page-modification'){
            response.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
            response.write("<script>alert('로그인 후 사용 가능합니다'); </script>");
            request.app.render('page-login',context, function(err,html){
                if(err){
                    console.error('뷰 렌더링 중 오류 발생:' + err.stack);
          
                    response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                    response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                    response.write('<p>'+err.stack+'</p>');
                    response.end();
          
                    return;
                }
                
          
                response.end(html);
            });
        }
        
        else{
        request.app.render(element,context, function(err,html){
            if(err){
                console.error('뷰 렌더링 중 오류 발생:' + err.stack);
                
                response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                response.write('<p>'+err.stack+'</p>');
                response.end();
      
                return;
            }
      
            response.end(html);
        });
    }
      });


      app.get('/page-modification', function(request, response) {
   
        
        var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect};
        
    
        back='page-modification';
        request.app.render('page-modification',context, function(err,html){
        if(err){
            console.error('뷰 렌더링 중 오류 발생:' + err.stack);
            response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
            response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            response.write('<p>'+err.stack+'</p>');
            response.end();
  
            return;
        }
       
  
        response.end(html);
    });
});

     


    app.post('/modification',function(request, response) {

        var paramName = request.body.name || request.query.name;
        var paramEmail = request.body.email || request.query.email;
        var paramTelephone = request.body.telephone || request.query.telephone;
        var paramSchool = request.body.school || request.query.school;
      
        if(database){
            modification(database, paramName, paramEmail, paramTelephone, paramSchool, function(err, result){
                back='page-mypage';

                if(err){throw err;}
    
                if(result){
                    myname=paramName;
                    nhemail=paramEmail;
                    nhtelephone=paramTelephone;
                    nhschool=paramSchool;

                    if(quizCorrect>=70){
                        myCheck=1;}
                     var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool, quiz : quizCorrect, check : myCheck};

                    request.app.render('page-mypage',context, function(err,html){
                        if(err){
                            console.error('뷰 렌더링 중 오류 발생:' + err.stack);
    
                            response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                            response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                            response.write('<p>'+err.stack+'</p>');
                            response.end();
    
                            return;
                        }
    
                        response.end(html);
                    });
                }
                else{
                    response.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                    console.log('점수 입력 오류.');
                }
            });
        }
       
        
    });   



app.post('/login',function(request, response) {

    var paramId = request.body.id || request.query.id;
    var paramPassword = request.body.password || request.query.password;
  

    if(paramId==undefined  || paramPassword==undefined){
        response.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        console.log('입력이 되지 않았습니다.');
        response.write("<script>alert('입력이 되지 않았습니다'); history.go(-1);</script>");
    }


    else{
    //console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.', paramId, paramPassword);
    if(database){
        authUser(database, paramId, paramPassword, function(err, docs){
            if(err){throw err;}

            if(docs){
                //console.dir(docs);

                var username = docs[0].name;
                nhname=paramId;
                nhemail=docs[0].email;
                nhtelephone=docs[0].telephone;
                nhschool=docs[0].school;
               // response.writeHead('200',{'Content-Type': 'text/html;charset=utf8'});
               myname=username;

           
               var quiz1code ="height : "+quiz1per+"%";
               var quiz2code ="height : "+quiz2per+"%";
               var quiz3code ="height : "+quiz3per+"%";
               var quiz4code ="height : "+quiz4per+"%";
               var quiz5code ="height : "+quiz5per+"%";
               
               var quiz1codeScore ="width : "+quiz1per+"%";
               var quiz2codeScore ="width : "+quiz2per+"%";
               var quiz3codeScore ="width : "+quiz3per+"%";
               var quiz4codeScore ="width : "+quiz4per+"%";
               var quiz5codeScore ="width : "+quiz5per+"%";
       
               if(quiz1==0){
                   var quiz1codeInco ="width : "+100.00+"%";
                   var inco1 = 3;
               }
               else if(quiz1==1){
                   var quiz1codeInco ="width : "+66.66+"%";
                   var inco1 = 2;
               }
               else if(quiz1==2){
                   var quiz1codeInco ="width : "+33.33+"%";
                   var inco1 = 1;
               }
               else if(quiz1==3){
                   var quiz1codeInco ="width : "+0+"%";
                   var inco1 = 0;
               }
       
               if(quiz2==0){
                   var quiz2codeInco ="width : "+100+"%";
                   var inco2 = 3;
               }
               else if(quiz2==1){
                   var quiz2codeInco ="width : "+66.66+"%";
                   var inco2 = 2;
               }
               else if(quiz2==2){
                   var quiz2codeInco ="width : "+33.33+"%";
                   var inco2 = 1;
               }
               else if(quiz2==3){
                   var quiz2codeInco ="width : "+0+"%";
                   var inco2 = 0;
               }
               
               if(quiz3==0){
                   var quiz3codeInco ="width : "+100+"%";
                   var inco3 = 3;
               }
               else if(quiz3==1){
                   var quiz3codeInco ="width : "+66.66+"%";
                   var inco3 = 2;
               }
               else if(quiz3==2){
                   var quiz3codeInco ="width : "+33.33+"%";
                   var inco3 = 1;
               }
               else if(quiz3==3){
                   var quiz3codeInco ="width : "+0+"%";
                   var inco3 = 0;
               }
       
               if(quiz4==0){
                   var quiz4codeInco ="width : "+100+"%";
                   var inco4 = 3;
               }
               else if(quiz4==1){
                   var quiz4codeInco ="width : "+66.66+"%";
                   var inco4 = 2;
               }
               else if(quiz4==2){
                   var quiz4codeInco ="width : "+33.33+"%";
                   var inco4 = 1;
               }
               else if(quiz4==3){
                   var quiz4codeInco ="width : "+0+"%";
                   var inco4 = 0;
               }
       
               if(quiz5==0){
                   var quiz5codeInco ="width : "+100+"%";
                   var inco5 = 3;
               }
               else if(quiz5==1){
                   var quiz5codeInco ="width : "+66.66+"%";
                   var inco5 = 2;
               }
               else if(quiz5==2){
                   var quiz5codeInco ="width : "+33.33+"%";
                   var inco5 = 1;
               }
               else if(quiz5==3){
                   var quiz5codeInco ="width : "+0+"%";
                   var inco5 = 0;
               }
               
       
               
       
          
               console.log('1484');
               console.log(quiz4avg+'1485');
       
               if(quizCorrect>=70){
                   myCheck=1;
               }
               
       
               var context = {name: myname, email: nhemail, telephone: nhtelephone, school: nhschool , quiz : quizCorrect, check : myCheck, chart1bar : quiz1code, chart2bar:quiz2code, chart3bar:quiz3code, chart4bar:quiz4code, chart5bar:quiz5code,
                   chart1prog: quiz1codeScore, chart2prog: quiz2codeScore, chart3prog: quiz3codeScore, chart4prog: quiz4codeScore, chart5prog: quiz5codeScore,
                   chart1in: quiz1codeInco, chart2in: quiz2codeInco, chart3in: quiz3codeInco, chart4in: quiz4codeInco, chart5in: quiz5codeInco,
                   coNum1 : quiz1per, coNum2 : quiz2per, coNum3 : quiz3per, coNum4 : quiz4per, coNum5 : quiz5per, 
                   incoNum1 : inco1, incoNum2 : inco2, incoNum3 : inco3, incoNum4 : inco4, incoNum5 : inco5,
                   chart1avg : quiz1avg, chart2avg : quiz2avg, chart3avg : quiz3avg, chart4avg : quiz4avg, chart5avg : quiz5avg
               };

                request.app.render(back,context, function(err,html){
                    if(err){
                        console.error('뷰 렌더링 중 오류 발생:' + err.stack);

                        response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        response.write('<p>'+err.stack+'</p>');
                        response.end();

                        return;
                    }
                   
                    response.end(html);
                    
                });
        

                //response.sendFile(__dirname + '/page-home.html', {name:paramId});
                //response.render(__dirname + '/page-home.html', {name:paramId});
                //response.sendFile(path.join(__dirname + '/page-home.html',{name :paramId.toString()}));
            }
            
            else{
                response.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                console.log('아이디/비밀번호가 틀렸습니다.');
                response.write("<script>alert('아이디/비밀번호가 틀렸습니다'); history.go(-1);</script>");
            }
        });
    }
    
}
});






app.post('/adduser', function(request, response) {

    var paramName = request.body.name || request.query.name;
    var paramId = request.body.id || request.query.id;
    var paramPassword = request.body.password || request.query.password;
    var paramEmail = request.body.email || request.query.email;
    var paramTelephone = request.body.telephone || request.query.telephone;
    var paramSchool = request.body.school || request.query.school;

    if(database){
        addUser(database, paramName,paramId, paramPassword, paramEmail, paramTelephone ,paramSchool, function(err, result){
            if(err){
            console.log('1436');
            response.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                        console.log('입력이 되지 않았습니다.');
                        response.write("<script>alert('ID가 이미 있습니다.'); history.go(-1);</script>");
            //throw err;
        }

            if(result && result.insertedCount >0 ){
                //var username = docs[0].name;
               // response.writeHead('200',{'Content-Type': 'text/html;charset=utf8'});
               //myname=username;
                var context = {name: "null"};
                request.app.render('page-login',context, function(err,html){
                    if(err){
                        console.error('뷰 렌더링 중 오류 발생:' + err.stack);
                        response.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        response.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        response.write('<p>'+err.stack+'</p>');
                        response.end();

                        return;
                    }
                   

                    response.end(html);
                });
            }
            else{
                response.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                console.log('회원 가입 오류.');
            }
        });
    }
    
});




var authUser = function(database, id, password, callback){
    console.log('authUser 호출됨.');
    console.log(id);
    console.log(password);

    var users = database.collection('users');
    var webQuizScore = database.collection('webQuizScore');
    var checkPassword;
    var checkId;

    users.find({"_id" : id}).toArray(function(err, docs){
        if(err){
            callback(err, null);
            return;
        }

        if(docs.length<=0){
            console.log(" 하하하");
            callback(null,null);
            return;
        }
        console.log("여기");
        checkPassword=docs[0].password;
        checkId=docs[0]._id;

        if(password!=checkPassword||id!=checkId){
            console.log(" 틀림");
            callback(null,null);
            return;
        }

        
        
        else{
        if(docs.length > 0){
            console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.', id, password);

            webQuizScore.find({"_id" : id}).toArray(function(err, docs){
                if(err){
                    callback(err, null);
                    return;
                }
        
                if(docs.length > 0){
                    console.log('사용자 찾음');
                    quiz1=docs[0].quizScore1;
                    quiz2=docs[0].quizScore2;
                    quiz3=docs[0].quizScore3;
                    quiz4=docs[0].quizScore4;
                    quiz5=docs[0].quizScore5;

                    if(quiz1==0){
                        quiz1per=0;
                        quizCorrect+=0;
                    }
                    else if(quiz1==1){
                        quiz1per=33.33;
                        quizCorrect+=33.33;
                    }
                    else if(quiz1==2){
                        quiz1per=66.66;
                        quizCorrect+=66.66;
                    }
                    else if(quiz1==3){
                        quiz1per=100.00;
                        quizCorrect+=100.00;
                    }


                    if(quiz2==0){
                        quiz2per=0;
                        quizCorrect+=0;
                    }
                    else if(quiz2==1){
                        quiz2per=33.33;
                        quizCorrect+=33.33;
                    }
                    else if(quiz2==2){
                        quiz2per=66.66;
                        quizCorrect+=66.66;
                    }
                    else if(quiz2==3){
                        quiz2per=100.00;
                        quizCorrect+=100.00;
                    }


                    if(quiz3==0){
                        quiz3per=0;
                        quizCorrect+=0;
                    }
                    else if(quiz3==1){
                        quiz3per=33.33;
                        quizCorrect+=33.33;
                    }
                    else if(quiz3==2){
                        quiz3per=66.66;
                        quizCorrect+=66.66;
                    }
                    else if(quiz3==3){
                        quiz3per=100.00;
                        quizCorrect+=100.00;
                    }

                    if(quiz4==0){
                        quiz4per=0;
                        quizCorrect+=0;
                    }
                    else if(quiz4==1){
                        quiz4per=33.33;
                        quizCorrect+=33.33;
                    }
                    else if(quiz4==2){
                        quiz4per=66.66;
                        quizCorrect+=66.66;
                    }
                    else if(quiz4==3){
                        quiz4per=100.00;
                        quizCorrect+=100.00;
                    }

                    if(quiz5==0){
                        quiz5per=0;
                        quizCorrect+=0;
                    }
                    else if(quiz5==1){
                        quiz5per=33.33;
                        quizCorrect+=33.33;
                    }
                    else if(quiz5==2){
                        quiz5per=66.66;
                        quizCorrect+=66.66;
                    }
                    else if(quiz5==3){
                        quiz5per=100.00;
                        quizCorrect+=100.00;
                    }
                    
                    quizCorrect=quizCorrect/5;
                    quizCorrect=quizCorrect.toFixed(2);

                    avgQuiz();
                    //callback(null, docs);
                }
                /*else{
                    console.log("일치하는 사용자를 찾지 못함.");
                    callback(null,null);
                }*/
            });


            callback(null, docs);
        }
        else{
            console.log("일치하는 사용자를 찾지 못함.");
            callback(null,null);
        }
    }
    });
}


var avgQuiz = function(){
    console.log('퀴즈 평균 점수');
    avg1=0, avg2=0, avg3=0, avg4=0, avg5=0;
    var webQuizScore = database.collection('webQuizScore');
    webQuizScore.find().toArray(function(err,docs){

        for(var i=0; i<docs.length;i++){
            if(docs[i].quizScore1==null){
                avg1+=0;
            }
            else if(docs[i].quizScore1==1){
            avg1+=33.33; }

            else if(docs[i].quizScore1==2){
                avg1+=66.66; }

                
            else if(docs[i].quizScore1==3){
                    avg1+=100.00; }

             else if(docs[i].quizScore1==0){
                        avg1+=0; } 
        }


        for(var i=0; i<docs.length;i++){
            if(docs[i].quizScore2==null){
                avg2+=0;
            }
            else if(docs[i].quizScore2==1){
            avg2+=33.33; }

            else if(docs[i].quizScore2==2){
                avg2+=66.66; }

                
            else if(docs[i].quizScore2==3){
                    avg2+=100.00; }

             else if(docs[i].quizScore2==0){
                        avg2+=0; } 
        }

        for(var i=0; i<docs.length;i++){
            if(docs[i].quizScore3==null){
                avg3+=0;
            }
            else if(docs[i].quizScore3==1){
            avg3+=33.33; }

            else if(docs[i].quizScore3==2){
                avg3+=66.66; }

                
            else if(docs[i].quizScore3==3){
                    avg3+=100.00; }

             else if(docs[i].quizScore3==0){
                        avg3+=0; } 
        }

        for(var i=0; i<docs.length;i++){
            if(docs[i].quizScore4==null){
                avg4+=0;
            }
            else if(docs[i].quizScore4==1){
            avg4+=33.33; }

            else if(docs[i].quizScore4==2){
                avg4+=66.66; }

                
            else if(docs[i].quizScore4==3){
                    avg4+=100.00; }

             else if(docs[i].quizScore4==0){
                        avg4+=0; } 
        }

        for(var i=0; i<docs.length;i++){
            if(docs[i].quizScore5==null){
                avg5+=0;
            }
            else if(docs[i].quizScore5==1){
            avg5+=33.33; }

            else if(docs[i].quizScore5==2){
                avg5+=66.66; }

                
            else if(docs[i].quizScore5==3){
                    avg5+=100.00; }

             else if(docs[i].quizScore5==0){
                        avg5+=0; } 
        }

        avg1=avg1/docs.length;
        avg2=avg2/docs.length;
        avg3=avg3/docs.length;
        avg4=avg4/docs.length;
        avg5=avg5/docs.length;

        
        
        console.log(avg1);
        console.log(avg2);
        console.log(avg3);
        console.log(avg4);
        console.log(avg5);

        quiz1avg = "height : "+avg1+"%;";      
        quiz2avg = "height : "+avg2+"%;"; 
        quiz3avg = "height : "+avg3+"%;"; 
        quiz4avg = "height : "+avg4+"%;"; 
        quiz5avg = "height : "+avg5+"%;";   
        
        
    });
    
    
}


var addUser = function(database, name, id,  password, email, telephone, school, callback){
    console.log('addUser 호출됨.');
    
    var users = database.collection('users');
    var webQuizScore = database.collection('webQuizScore');

    users.insertMany([{"name" : name, "_id": id, "password": password, "email": email, "telephone": telephone, "school": school}], function(err, result){
        if(err){
            console.log('1763');
            callback(err, null);
            return;
        }

        if(result.insertedCount > 0){
            console.log("사용자 레코드 추가됨 : "+ result.insertedCount);
            
        }
        else{
            console.log("추가된 레코드가 없음");
        }

        callback(null, result);
    });

    console.log('1778');
    webQuizScore.insertMany([{"_id" : id, "quizScore1" : null, "quizScore2" : null, "quizScore3" : null, "quizScore4" : null, "quizScore5" : null}], function(err,result){
        if(err){
            callback(err,null);
            return;
        }
        console.log('1785');
        if(result.insertedCount>0){
            console.log("사용자 퀴즈 테이블 추가됨");
        }
        else{
            console.log("추가된 퀴즈 레코드 없음");
        }

        callback(null,result);
    });
}


var addWebQuizScore = function(database, id, quizScore, num, callback){
    console.log("addWebQuizScore 호출됨.");
    var webQuizScore = database.collection('webQuizScore');


    if(num==1){
        webQuizScore.updateOne({"_id" : id}, {$set : {"quizScore1" : quizScore}}, {upsert:true}, function(err,result){
            if(err){
                callback(err,null);
                return;
            }
            if(result){
                console.log("사용자 퀴즈 점수 추가됨");
            }
            else{
                console.log("추가된 퀴즈 레코드 없음");
            }
    
            callback(null,result);
        });
    }
    else if(num==2){
        webQuizScore.updateOne({"_id" : id}, {$set : {"quizScore2" : quizScore}}, {upsert:true}, function(err,result){
            if(err){
                callback(err,null);
                return;
            }
            if(result){
                console.log("사용자 퀴즈 점수 추가됨");
            }
            else{
                console.log("추가된 퀴즈 레코드 없음");
            }
    
            callback(null,result);
        });
    }
    else if(num==3){
        webQuizScore.updateOne({"_id" : id}, {$set : {"quizScore3" : quizScore}}, {upsert:true}, function(err,result){
            if(err){
                callback(err,null);
                return;
            }
            if(result){
                console.log("사용자 퀴즈 점수 추가됨");
            }
            else{
                console.log("추가된 퀴즈 레코드 없음");
            }
        
            callback(null,result);
        });
    }
    else if(num==4){
        webQuizScore.updateOne({"_id" : id}, {$set : {"quizScore4" : quizScore}}, {upsert:true}, function(err,result){
            if(err){
                callback(err,null);
                return;
            }
            if(result){
                console.log("사용자 퀴즈 점수 추가됨");
            }
            else{
                console.log("추가된 퀴즈 레코드 없음");
            }
            
            callback(null,result);
        });
    }
    else if(num==5){
        webQuizScore.updateOne({"_id" : id}, {$set : {"quizScore5" : quizScore}}, {upsert:true}, function(err,result){
            if(err){
                callback(err,null);
                return;
            }
            if(result){
                console.log("사용자 퀴즈 점수 추가됨");
            }
            else{
                console.log("추가된 퀴즈 레코드 없음");
            }
        
            callback(null,result);
        });
    }

}

var modification= function(database, pname, pemail, ptelephone, pschool, callback){
    console.log("modification 호출됨.");
    console.log(nhname);
    var users = database.collection('users');

   
    users.updateOne({"_id":nhname},{$set : {"name": pname, "email" : pemail, "telephone" : ptelephone, "school": pschool}} ,{ upsert: true },function (err,result){


        if(err){
            callback(err,null);
            return;
        }

        if(result){
            console.log("사용자 변경");
        }
        else{
            console.log("추가된 퀴즈 레코드 없음");
        }

        callback(null,result);
    });
}



function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017';

    MongoClient.connect(databaseUrl, {useUnifiedTopology : true},function(err, client){
        if(err) throw err;

        console.log('데이터베이스에 연결되었습니다.: '+ databaseUrl);
        var db = client.db('local');

        database=db;
    });
}



/*var server= app.listen(port, function(err) {
  console.log('Connected port - ' + port);
  if (err) {
    return console.log('Found error - ', err);
  }
  connectDB();
});*/

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));

    connectDB();
  });

//===== Socket.IO를 이용한 채팅 테스트 부분 =====//

//socket.io 서버를 시작합니다.
var io = socket.listen(server);
console.log('socket.io 요청을 받아들일 준비가 되었습니다.');

//클라이언트가 연결했을 때의 이벤트 처리
var login_ids = {};


// 클라이언트가 연결했을 때의 이벤트 처리
io.sockets.on('connection', function(socket) {
	console.log('connection info :', socket.request.connection._peername);

    // 소켓 객체에 클라이언트 Host, Port 정보 속성으로 추가
    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;
    console.log(socket.remoteAddress+'2114');
    console.log(socket.remotePort+'2115');
  //sendResponse(socket, 'login', '200', '로그인되었습니다.');
    

    // 'login' 이벤트를 받았을 때의 처리
    socket.on('login', function(login) {
    	console.log('login 이벤트를 받았습니다.');
    	console.dir(login);

        // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
        console.log('접속한 소켓의 ID : ' + socket.id);
        login_ids[login.id] = socket.id;
        socket.login_id = login.id;

        console.log('접속한 클라이언트 ID 갯수 : %d', Object.keys(login_ids).length);

        //io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: login + '님이 접속하였습니다.'})
        // 응답 메시지 전송
        sendResponse(socket, 'login', '200', '로그인되었습니다.');
    });

    
    // 'message' 이벤트를 받았을 때의 처리
    socket.on('message', function(message) {
    	console.log('message 이벤트를 받았습니다.');
    	console.dir(message);
    	
        if (message.recepient =='ALL') {
            // 나를 포함한 모든 클라이언트에게 메시지 전달
        	console.dir('나를 포함한 모든 클라이언트에게 message 이벤트를 전송합니다.')
            io.sockets.emit('message', message);
        } else {
        	// command 속성으로 일대일 채팅과 그룹채팅 구분
        	if (message.command == 'chat') {
	        	// 일대일 채팅 대상에게 메시지 전달
	        	if (login_ids[message.recepient]) {
	        		io.sockets.connected[login_ids[message.recepient]].emit('message', message);
	        		
	        		// 응답 메시지 전송
	                sendResponse(socket, 'message', '200', '메시지를 전송했습니다.');
	        	} else {
	        		// 응답 메시지 전송
	                sendResponse(socket, 'login', '404', '상대방의 로그인 ID를 찾을 수 없습니다.');
                }
                
        	} else if (message.command == 'groupchat') {
	        	// 방에 들어있는 모든 사용자에게 메시지 전달
	        	io.sockets.in(message.recepient).emit('message', message);
	        		
	        	// 응답 메시지 전송
	            sendResponse(socket, 'message', '200', '방 [' + message.recepient + ']의 모든 사용자들에게 메시지를 전송했습니다.');
        	}
        	
        }
    });
    

    // 'room' 이벤트를 받았을 때의 처리
    socket.on('room', function(room) {
    	console.log('room 이벤트를 받았습니다.');
    	console.dir(room);
    	
        if (room.command === 'create') {

        	if (io.sockets.adapter.rooms[room.roomId]) { // 방이 이미 만들어져 있는 경우
        		console.log('방이 이미 만들어져 있습니다.');
        		
        	} else {
        		console.log('방을 새로 만듭니다.');
        		
        		socket.join(room.roomId);
        		
	            var curRoom = io.sockets.adapter.rooms[room.roomId];
	            curRoom.id = room.roomId;
	            curRoom.name = room.roomName;
	            curRoom.owner = room.roomOwner;
        	}

        } else if (room.command === 'update') {
        	
            var curRoom = io.sockets.adapter.rooms[room.roomId];
            curRoom.id = room.roomId;
            curRoom.name = room.roomName;
            curRoom.owner = room.roomOwner;
             
        } else if (room.command === 'delete') {

            socket.leave(room.roomId);
 
            if (io.sockets.adapter.rooms[room.roomId]) { // 방이  만들어져 있는 경우
            	delete io.sockets.adapter.rooms[room.roomId];
            } else {  // 방이  만들어져 있지 않은 경우
            	console.log('방이 만들어져 있지 않습니다.');
            	
            }
        } else if (room.command === 'join') {  // 방에 입장하기 요청

            socket.join(room.roomId);
         
            // 응답 메시지 전송
            sendResponse(socket, 'room', '200', '방에 입장했습니다.');
        } else if (room.command === 'leave') {  // 방 나가기 요청

            socket.leave(room.roomId);
         
            // 응답 메시지 전송
            sendResponse(socket, 'room', '200', '방에서 나갔습니다.');
        }

        var roomList = getRoomList();
        
        var output = {command:'list', rooms:roomList};
        console.log('클라이언트로 보낼 데이터 : ' + JSON.stringify(output));
        
        io.sockets.emit('room', output);
    });
    
    
    
});

function getRoomList() {
	console.dir(io.sockets.adapter.rooms);
	
    var roomList = [];
    
    Object.keys(io.sockets.adapter.rooms).forEach(function(roomId) { // for each room
    	console.log('current room id : ' + roomId);
    	var outRoom = io.sockets.adapter.rooms[roomId];
    	
    	// find default room using all attributes
    	var foundDefault = false;
    	var index = 0;
        Object.keys(outRoom.sockets).forEach(function(key) {
        	console.log('#' + index + ' : ' + key + ', ' + outRoom.sockets[key]);
        	
        	if (roomId == key) {  // default room
        		foundDefault = true;
        		console.log('this is default room.');
        	}
        	index++;
        });
        
        if (!foundDefault) {
        	roomList.push(outRoom);
        }
    });
    
    console.log('[ROOM LIST]');
    console.dir(roomList);
    
    return roomList;
}

// 응답 메시지 전송 메소드
function sendResponse(socket, command, code, message) {
	var statusObj = {command: command, code: code, message: message};
	socket.emit('response', statusObj);
}

// 시작된 서버 객체를 리턴받도록 합니다. 
/*var server = http.createServer(app);
server.listen(3000, function(){
	console.log('서버가 시작되었습니다. 포트 : ' + port);

	// 데이터베이스 초기화
	connectDB();
   
});

/*var server = http.createServer(app).listen(port, function(){
	console.log('서버가 시작되었습니다. 포트 : ' + port);

	// 데이터베이스 초기화
	connectDB();
   
});*/


/*
var io = socketio.listen(server);
console.log('socket.io 요청을 받아들일 준비가 되었습니다.');

//클라이언트가 연결했을 때의 이벤트 처리
io.sockets.on('connection', function(socket) {
	console.log('connection info :', socket.request.connection._peername);

	// 소켓 객체에 클라이언트 Host, Port 정보 속성으로 추가
	socket.remoteAddress = socket.request.connection._peername.address;
	socket.remotePort = socket.request.connection._peername.port;
});*/

