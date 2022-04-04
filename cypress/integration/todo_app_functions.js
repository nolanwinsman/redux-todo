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
    cy.wait(500); // TODO find a way to do this without a delay
    cy.get(".textInput").type(taskText + "{enter}");
  }

  /**
   * Deletes the task at the top of the list of tasks
   *
   * @author Nolan Winsman
   */
  deleteTask() {
    // TODO validate the X button/buttons exists then try to delete
    cy.get(".rowButton")
      .eq(0)
      .should("not.have.attr", "disabled", "code-snippet")
      .click();
  }
  /**
   * Overloaded method for deleteTask()
   * Deletes the task that contains the text inside of taskText.
   *
   * @param {string} taskText The text of the task that should be deleted
   * @author Nolan Winsman
   */
  deleteTask(taskText) {
    cy.contains(".row", taskText).children().eq(1).click();
    cy.get('[data-testid="deleteButton_"');
  }

  /**
   * Deletes all listed tasks in the app.
   *
   * @author Nolan Winsman
   */
  deleteAllTasks() {
    // TODO not deleting the first two Tasks
    cy.get(".App-body").children().should("not.have.length", 0); // validates there are tasks to delete

    cy.get(".rowButton")
      .should("not.have.attr", "disabled", "code-snippet")
      // .each goes through every task
      .each(($btn, index) => {
        // if (index >= 1) {
        cy.wait(100);
        cy.wrap($btn).click();
        cy.wait(100); // delay avoids dom element errors, TODO make it check .App-system
        //}
      });
  }

  /**
   * Edits a desired task with the new text of newTaskText
   *
   * @param {string} newTaskText The task will be edited to contain this text
   * @param {number} index This value represents which task is going to be edited. Defaults to a value of 0 for the first task.
   * @author Nolan Winsman
   */
  editTask(newTaskText, index = 0) {
    cy.get(".row")
      .eq(index)
      .children()
      .first()
      .type(newTaskText + "{enter}"); // TODO should clear text first then add new text
    cy.get(".rowButton")
      .eq(index)
      .should("not.have.attr", "disabled", "code-snippet")
      .contains("DONE")
      .click();
  }
}

export { todo_page };
