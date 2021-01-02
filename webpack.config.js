const path = require('path');/*Path это модуль в node, получает мы его с помощью глобальной функции в node require* из списка стандартных пакетов для node.js*/

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //Плагин для очистки папки dist(деструктуризация)

const HTMLWebpackPlugin = require('html-webpack-plugin'); //Плагин для работы с html

const CopyPlugin = require('copy-webpack-plugin'); // Плагин для переноса favicon

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV == 'production'; // Переменная с помощью которой мы определяем в каком режиме сборки мы находимся
const isDev = !isProd;


const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`; // Функция чтобы в названия файлов добавлялся хеш только в продкш моде

const jsLoaders = () => { // Функция для работы с Eslint, она вызывается в модуле для js
   const loaders = [
      {
         loader: 'babel-loader', // Добавление плагинов для Babel через Webpack
         options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
         },
      },
   ];

   if (isDev) {
      loaders.push('eslint-loader');
   }
   return loaders;
};

module.exports = { /* Из данного файла мы экспортируем js-объект который является конфигурацияей для webpack. module.exports - команда node.js*/

   context: path.resolve(__dirname, 'src'), /*Отвечает за то где лежат исходники проекта. __dirname отвечает за абсолютный путь к папке проекта. Метод resolve соединяет дирнейм и src. Таким образом мы указали контекст и вебпак будет смотреть за исходниками в папке src*/

   mode: 'development', // Режим разработки

   entry: ['@babel/polyfill', './index.js'], /* Входная точка для приложения. Здесь должен быть объект, но так как входная точка только одна мы передали строку*/

   output: {
      filename: filename('js'), //Файл финальной сборки в котором будет весь js
      path: path.resolve(__dirname, 'dist'), //Путь где будет хранится финальная сборка
   },

   resolve: {
      extensions: ['.js'],
      alias: { // alias нужен чтобы не писать длинные пути
         '@core': path.resolve(__dirname, 'src/core'),
      },
   },

   devtool: isDev ? 'source-map' : false, // Добавление map-файлов

   devServer: {
      port: 3000,
      hot: isDev,
   },

   plugins: [ //Плагины добавляются в массив plugins

      new CleanWebpackPlugin(), //Вызов функции очистки папки dist

      new HTMLWebpackPlugin({ //Вызов HTMl плагина с настройками, он нужен чтобы не указывать постоянно название подключаемого bundle.js, так как из за [hash] название будет меняться

         template: 'index.html', //Откуда будет взят шаблон html чтобы плагин его не генерил сам
         minify: {
            removeComments: isProd, // Удалять комменты из HTML только если это продакшн сборка
            collapseWhitespace: isProd, // Удалять пробелы из HTML только если это продакшн сборка
         },


      }),

      new CopyPlugin({ // Плагин для переноса favicon
         patterns: [
            {
               from: path.resolve(__dirname, 'src/favicon.ico'),
               to: path.resolve(__dirname, 'dist/favicon.ico'),
            },
         ],
      }),

      new MiniCssExtractPlugin({
         filename: filename('css'), // В какой файл все поместить
      }),
   ],

   module: { //Установка Лоадеров
      rules: [
         {
            test: /\.s[ac]ss$/i, //Тестируем расширение scss
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     hmr: isDev,
                     reloadAll: true,
                  },
               },
               'css-loader',
               'sass-loader',
            ],
         },

         { //Объект для работы с Babel
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: jsLoaders(),
         },
      ],
   },
};
