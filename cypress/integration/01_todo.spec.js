/// <reference types="cypress" />

import { todo_page } from "./todo_app_functions";

const todoPage = new todo_page();

const URL = Cypress.env("baseUrl");

describe("Todo App Testing Suite", () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.clearLocalStorage();
    // cy.wait(2000); // waits for tasks to load in
    // cy.url().should("eq", URL); // validates that you are on the desired page
  });

  afterEach(() => {
    todoPage.deleteAllTasks();
  });

  it("add a task", () => {
    todoPage.addTask("[add a task] test case");
  });

  it("add multiple tasks", () => {
    for (let i = 0; i < 6; ++i) {
      todoPage.addTask("Task " + i);
    }
  });

  it("create a duplicate task", () => {
    const n = 3; // represents the number of duplicate tasks created
    for (let i = 0; i < n; ++i) {
      todoPage.addTask("Task with duplicate text");
    }
  });

  it("validate the user is unable to add an empty task", () => {
    cy.getByTestId("add-todo-button").click(); // passes in an empty string to represent an empty task
    // checks that an alert pops up for trying to add a todo with no text
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Please fill in your todo");
    });
    todoPage.addTask("                   "); // passes in a string of spaces which should not yield a new task
    // checks that an alert pops up for trying to add a todo with no only spaces
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Please fill in your todo");
    });
  });

  it.only("validate that if there are 15+ tasks, the user may scroll through the tasks to successfully view all of the tasks", () => {
    for (let i = 0; i < 9; ++i) {
      todoPage.addTask("Adding Task " + i);
    }
    cy.getByTestId("app-body").should("have.css", "overflow-y", "scroll"); // validates that the scroll bar is present
  });

  it("delete a task", () => {
    const taskText = "Task to be Deleted";
    todoPage.addTask(taskText);
    todoPage.deleteTask(taskText);
    // todoPage.deleteTask(taskText);
  });

  it("delete all tasks", () => {
    for (let i = 0; i < 10; ++i) {
      todoPage.addTask("Task " + i + " This should be deleted");
    }
    todoPage.deleteAllTasks();
    cy.get(".row").should("not.exist");
  });
});
