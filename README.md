# Blog API Documentation

## User Routes

### Get User Details

**Endpoint:** `GET /user/:userId/view`  
**Description:** Fetch user details.

### Get a Specific Post by User

**Endpoint:** `GET /user/:userId/post/:postId/view`  
**Description:** Retrieve a specific post by a user.

### Get All Posts by User

**Endpoint:** `GET /user/:userId/posts`  
**Description:** Retrieve all posts created by a user.

### Get User Followers

**Endpoint:** `GET /user/:userId/followers`  
**Description:** Fetch the list of followers for a user.

### Get User Following

**Endpoint:** `GET /user/:userId/following`  
**Description:** Fetch the list of users followed by the user.

### Get Archived Posts (Protected)

**Endpoint:** `GET /user/:userId/posts/archived`  
**Description:** Retrieve archived posts of a user.

### Update User Information (Protected)

**Endpoint:** `PUT /user/:userId/edit/name`  
**Description:** Update the user's name. Requires validation.

**Endpoint:** `PUT /user/:userId/edit/email`  
**Description:** Update the user's email. Requires validation.

**Endpoint:** `PUT /user/:userId/edit/bio`  
**Description:** Update the user's bio. Requires validation.

**Endpoint:** `PUT /user/:userId/edit/password`  
**Description:** Update the user's password. Requires validation.

### Follow & Unfollow User (Protected)

**Endpoint:** `POST /user/:userId/followee/:followeeId/follow`  
**Description:** Follow another user.

**Endpoint:** `POST /user/:userId/followee/:followeeId/unfollow`  
**Description:** Unfollow a user.

### Delete User (Protected)

**Endpoint:** `DELETE /user/:userId/delete`  
**Description:** Delete the user's account.

---

## Post Routes

### Get All Posts

**Endpoint:** `GET /posts/`  
**Description:** Retrieve all posts.

### Create a New Post (Protected)

**Endpoint:** `POST /posts/new`  
**Description:** Create a new post. Requires validation.

### Edit Post (Protected)

**Endpoint:** `PUT /posts/:postId/title`  
**Description:** Update post title. Requires validation.

**Endpoint:** `PUT /posts/:postId/body`  
**Description:** Update post body. Requires validation.

**Endpoint:** `PUT /posts/:postId/archive`  
**Description:** Archive a post.

**Endpoint:** `PUT /posts/:postId/publish`  
**Description:** Publish a post.

### Delete Post (Protected)

**Endpoint:** `DELETE /posts/:postId/delete`  
**Description:** Delete a post.

---

## Comment Routes

### Add a Comment (Protected)

**Endpoint:** `POST /comment/post/:postId/new`  
**Description:** Add a comment to a post. Requires validation.

### Reply to a Comment (Protected)

**Endpoint:** `POST /comment/:commentId/post/:postId/reply`  
**Description:** Reply to a comment. Requires validation.

### Edit a Comment (Protected)

**Endpoint:** `PUT /comment/:commentId/edit`  
**Description:** Edit a comment. Requires validation.

### Delete a Comment (Protected)

**Endpoint:** `DELETE /comment/:commentId/delete`  
**Description:** Delete a comment.

---

## Authentication Routes

### User Signup

**Endpoint:** `POST /auth/signup`  
**Description:** Register a new user. Requires validation.

### User Login

**Endpoint:** `POST /auth/login`  
**Description:** Authenticate and log in a user. Requires validation.
