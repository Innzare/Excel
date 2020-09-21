const path = require('path'); /*Path это модуль в node, получает мы его с помощью глобальной функции в node require* из списка стандартных пакетов для node.js*/

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //Плагин для очистки папки dist(деструктуризация)

const HTMLWebpackPlugin = require('html-webpack-plugin'); //Плагин для работы с html

const CopyPlugin = require('copy-webpack-plugin'); // Плагин для переноса favicon

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {   /* Из данного файла мы экспортируем js-объект который является конфигурацияей для webpack. module.exports - команда node.js*/

   context: path.resolve(__dirname, 'src'), /*Отвечает за то где лежат исходники проекта. __dirname отвечает за абсолютный путь к папке проекта. Метод resolve соединяет дирнейм и src. Таким образом мы указали контекст и вебпак будет смотреть за исходниками в папке src*/

   mode: 'development', // Режим разработки

   entry: './index.js', /* Входная точка для приложения. Здесь должен быть объект, но так как входная точка только одна мы передали строку*/

   output: {
      filename: 'bundle.[hash].js', //Файл финальной сборки в котором будет весь js
      path: path.resolve(__dirname, 'dist') //Путь где будет хранится финальная сборка
   },

   resolve: {
      extensions: ['.js'],
      alias: { // alias нужен чтобы не писать длинные пути
         "@core": path.resolve(__dirname, 'src/core'),
      }
   },

   plugins: [ //Плагины добавляются в массив plugins

      new CleanWebpackPlugin(), //Вызов функции очистки папки dist

      new HTMLWebpackPlugin({ //Вызов HTMl плагина с настройками, он нужен чтобы не указывать постоянно название подключаемого bundle.js, так как из за [hash] название будет меняться

         template: 'index.html' //Откуда будет взят шаблон html чтобы плагин его не генерил сам

      }),

      new CopyPlugin({ // Плагин для переноса favicon
         patterns: [
            {
               from: path.resolve(__dirname, 'src/favicon.ico'),
               to: path.resolve(__dirname, 'dist/favicon.ico')
            },
         ],
      }),

      new MiniCssExtractPlugin({
         filename: 'bundle.[hash].css' // В какой файл все поместить
      })
   ],

   module: { //Установка Лоадеров
      rules: [
         {
            test: /\.s[ac]ss$/i, //Тестируем расширение scss
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
            ],
         },

         { //Объект для работы с Babel
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader", // Добавление плагинов для Babel через Webpack
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
      ],
   },
};
