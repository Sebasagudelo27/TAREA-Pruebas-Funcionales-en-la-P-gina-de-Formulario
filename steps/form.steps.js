const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const assert = require("assert");

let browser;
let page;

const USERNAME = "usuarioPrueba";
const PASSWORD = "contraseña123";
const COMMENT = "Este es un comentario de prueba funcional.";

Given("I access the test page", async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto(
    "https://testpages.herokuapp.com/styled/basic-html-form-test.html",
  );
});

When("I enter my username", async function () {
  await page.fill("input[name='username']", USERNAME);
});

When("I enter my password", async function () {
  await page.fill("input[name='password']", PASSWORD);
});

When("I enter a comment", async function () {
  await page.fill("textarea[name='comments']", COMMENT);
});

When("I select a checkbox", async function () {
  await page.check("input[type='checkbox'][value='cb1']");
  await page.check("input[type='checkbox'][value='cb3']");
});

When("I select a radio", async function () {
  await page.check("input[type='radio'][value='rd2']");
});

When("I select multiple values", async function () {
  await page.selectOption("select[name='multipleselect[]']", ["ms1", "ms3"]);
});

When("I select a dropdown item", async function () {
  await page.selectOption("select[name='dropdown']", "dd4");
});

When("I click on submit button", async function () {
  await page.click("input[type='submit']");
  await page.waitForSelector("table");
});

Then(
  "I should be presented with a successful form submission page",
  async function () {
    const contenido = await page.textContent("body");

    assert(
      contenido.includes(USERNAME),
      `Expected to find username "${USERNAME}" in the response, but it was not found.`,
    );

    assert(
      contenido.includes(PASSWORD),
      `Expected to find password in the response, but it was not found.`,
    );

    assert(
      contenido.includes(COMMENT),
      `Expected to find comment "${COMMENT}" in the response, but it was not found.`,
    );

    assert(
      contenido.includes("cb1"),
      `Expected to find checkbox value "cb1" in the response, but it was not found.`,
    );
    assert(
      contenido.includes("cb3"),
      `Expected to find checkbox value "cb3" in the response, but it was not found.`,
    );
    assert(
      contenido.includes("rd2"),
      `Expected to find radio value "rd2" in the response, but it was not found.`,
    );
    assert(
      contenido.includes("ms1"),
      `Expected to find multi-select value "ms1" in the response, but it was not found.`,
    );
    assert(
      contenido.includes("ms3"),
      `Expected to find multi-select value "ms3" in the response, but it was not found.`,
    );

    assert(
      contenido.includes("dd4"),
      `Expected to find dropdown value "dd4" in the response, but it was not found.`,
    );

    await browser.close();
  },
);
