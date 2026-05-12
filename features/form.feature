Feature: Test page form

  Scenario: Validate successful submission
    Given I access the test page
    When I enter my username
    And I enter my password
    And I enter a comment
    And I select a checkbox
    And I select a radio
    And I select multiple values
    And I select a dropdown item
    And I click on submit button
    Then I should be presented with a successful form submission page
