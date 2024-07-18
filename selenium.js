const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');

async function takeScreenshot (driver, filename) {
  let base64Data = await driver.takeScreenshot();
  fs.writeFileSync(filename, base64Data, 'base64');
}

async function testForm (inputTitle, screenshotName) {
  // Chromeブラウザのドライバを初期化
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // ローカルホストにアクセス
    await driver.get('http://localhost:3000');

    // タイトルを入力する場合のみ入力
    if (inputTitle) {
      await driver.findElement(By.name('title')).sendKeys('サンプルタスク');
    }

    // "詳細"フィールドに値を入力
    await driver.findElement(By.name('detail')).sendKeys('これはタスクの詳細です');

    // "カテゴリ"フィールドに値を入力
    await driver.findElement(By.name('category')).sendKeys('仕事');

    // "日付"フィールドに値を入力
    await driver.findElement(By.name('date')).sendKeys('2023-12-31');

    // "追加"ボタンをクリック
    await driver.findElement(By.css('button.w-full.bg-blue-500.text-white.p-2.rounded-sm')).click();

    // スクリーンショットを撮影して保存
    await takeScreenshot(driver, screenshotName);

    // 必要に応じて、ここで待機
    await driver.sleep(2000);
  } finally {
    // ブラウザを閉じる
    await driver.quit();
  }
}

async function runTests () {
  console.log('Test with title input');
  await testForm(true, 'test-with-title.png'); // タイトルを入力する場合のテスト

  console.log('Test without title input');
  await testForm(false, 'test-without-title.png'); // タイトルを入力しない場合のテスト
}

// テストを実行
runTests();