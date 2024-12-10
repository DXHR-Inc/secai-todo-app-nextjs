// tests/selenium.test.ts
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

/**
 * Seleniumを使用してクロスブラウザテストを実行するためのJavaScript関数関数を定義する
 * chrome、firefoxでlocalhost:3000のアプリのクロスブラウザテストを実行する関数を定義する
 * titleに「新しいタスク」, detailに「タスクの詳細」, categoryに「仕事」, dateに「002023-10-01」を入力してbutton#addTaskをクリックする
 * 追加をしてから10秒後に画面上に.task-cardクラスを持つ要素が存在することを確認する
 * 「削除」と書かれたラベルのボタンを押して、promptで「OK」を選択し、タスクを削除する
 * 削除をしてから10秒後に画面上に.task-cardクラスを持つ要素が存在しないことを確認する
 * テストが成功した場合はコンソールにメッセージを表示し、失敗した場合はエラーメッセージをコンソールに表示する
 * テストが終了したらブラウザを閉じる
 */