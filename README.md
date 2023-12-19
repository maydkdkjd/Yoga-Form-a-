This Yoga Classes Admission Form gathers the data from the user, validates it(age is between 18 to 65 or not) and stores the data into database(MongoDB).
Work flow - 
1. First, you will see the login page in the root webpage and u can see the signup option at the bottom.
2. Go to signup and enroll yourself for the Yoga Classes.
3. Come back to login page and log in as you won't navigate to homepage directly.
4. Enter correct email and password to login.
5. Upon that, you will see a dashboard that shows how much due is left for this month which is obviously(500 INR) as installment is not available.
6. Now, you can see the make payment that goes through mock payment function and updates the corresponding user due balance to zero.
7. You can see that after hitting the make payment button and then refreshing the page. And That's all.

Assumptions - 
1. User will always make the payment correctly.
2. Email id is verified of the user.

Tech Stack - React, Node.js, Express, MongoDB

ER Diagram - 
+----------------+      +----------------------+     +-----------------+
|    User        |      |   Batch              |     |   Payment       |
+----------------+      +----------------------+     +-----------------+
| id (PK)        |      | id (PK)              |     | id (PK)         |
| name           |      | time                 |     | amount          |
| age            |      | capacity             |     | user_id (FK)    |
| selected_batch |<-----| participants (FK)    |---->| batch_id (FK)   |
| created_at     |      +----------------------+     | created_at      |
+----------------+                                  +-----------------+
Note - I have not created payment table as it was clearly stated in the problem statement that we don't need to implement it.

Get all the data here - https://yoga-8bvo.onrender.com/users
