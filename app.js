import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import usersRouter from './routes/users.js';
import itemRoutes from './routes/item.js';
import productInfosRoutes from './routes/productInfo.js';
import  orderRoutes from './routes/order.js';


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '../FrontendWebShop9/dist/')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemRoutes)
app.use('/productInfo',productInfosRoutes)
app.use('/order',orderRoutes)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;