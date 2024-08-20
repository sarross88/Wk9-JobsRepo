#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

//models user.js 
Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

//token in response
- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

// TIME STAMP 8hr48min - Middleware Error Handler 
- Validation Errors - ex auth.js in conroller with req.body 
//not a unique email 
- Duplicate (Email)
//something doesn't exist 
- Cast Error - where you are using IDs in Jobs you should edit this (9hr 5min)
- END TIME STAMP @ 9hr9min

#### Security (start 9hr9min end )

- helmet (HTTP headers really popular)
- cors  ((Cross Orgin Resource Sharing)ensures api is accessible from another domain)
- xss-clean  (sanitized req.body, req.params, protects against malicious code)
- express-rate-limit (limits requests)

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
