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
async function runTest(browser) {
  let driver = await new Builder().forBrowser(browser).build();
  try {
		await driver.get('http://localhost:3000');
		await driver.findElement(By.id('title')).sendKeys('新しいタスク');
		await driver.findElement(By.id('detail')).sendKeys('タスクの詳細');
		await driver.findElement(By.id('category')).sendKeys('仕事');
		await driver.findElement(By.id('date')).sendKeys('002023-10-01');
		await driver.findElement(By.id('addTask')).click();
		await driver.wait(until.elementLocated(By.css('.task-card')), 10000);
		await driver.findElement(By.css('.task-card button')).click();
		await driver.switchTo().alert().accept();
		await driver.wait(until.stalenessOf(driver.findElement(By.css('.task-card'))), 10000);
		console.log(`Test passed on ${browser}`);
	} catch (err) {
		console.error(`Test failed on ${browser}: ${err}`);
	} finally {
		await driver.quit();
	}
}

(async function() {
  await runTest('chrome');
  await runTest('firefox');
})();