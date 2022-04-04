/// <reference types="cypress"/>

/**
 * Series of functions used to test the Hurdlr Todo Page.
 *
 * @author Nolan Winsman
 */
class todo_page {
  /**
   * Creates a task with the text of the parameter taskText
   *
   * @param {string} taskText The text the created task contains
   * @author Nolan Winsman
   */
  addTask(taskText) {
    cy.wait(200); // TODO find a way to do this without a delay
    cy.getByTestId("todo-input").type(taskText);
    cy.getByTestId("add-todo-button").click();
    // cy.scrollTo("top"); // Scroll 'sidebar' to its bottom
  }

  /**
   * Deletes the task at the top of the list of tasks
   *
   * @author Nolan Winsman
   */
  deleteTask() {
    cy.getByTestId("delete-todo-button").should(
      "not.have.attr",
      "disabled",
      "code-snippet"
    );
  }
  /**
   * Overloaded method for deleteTask()
   * Deletes the task that contains the text inside of taskText.
   *
   * @param {string} taskText The text of the task that should be deleted
   * @author Nolan Winsman
   */
  deleteTask(taskText) {
    // deletes the first task
    // TODO delete the task with String taskText
    cy.getByTestId("delete-todo-button").eq(0).click();
  }

  /**
   * Deletes all listed tasks in the app.
   *
   * @author Nolan Winsman
   */
  deleteAllTasks() {
    // TODO not deleting the first two Tasks
    // cy.getByTestId("delete-todo-button").should("not.have.length", 0); // validates there are tasks to delete

    cy.getByTestId("delete-todo-button")
      .should("not.have.attr", "disabled", "code-snippet")
      // .each goes through every task
      .each(($btn) => {
        // if (index >= 1) {
        cy.wait(100);
        cy.wrap($btn).click();
        cy.wait(100); // delay avoids dom element errors, TODO make it check .App-system
        //}
      });
  }
}

export { todo_page };
