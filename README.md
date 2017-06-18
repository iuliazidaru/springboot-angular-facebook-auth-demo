# springboot-angular-facebook-auth-demo
Rest Authentication Demo with Facebook API



#Configuration

#### Facebook configuration

- Create a facebook application (DOMAIN: myangularapp.com)
"App domains must match the domain of the Facebook Web Games URL (https), Mobile Site URL, Unity Binary URL, Site URL or Secure Page Tab URL."

- in `/etc/hosts` add:

        test.myangularapp.com

- Add `http://test.myangularapp.com:8910` in PRODUCTS/Facebook login/Settings/ Valid OAuth redirect URIs

#### Backend application

- in backend `/src/main/resources/application.yml` change `clientId` to your identifier

#### Frontend application

- change the domain in `frontend/package.json` to test.myangularapp.com instead of localhost

- in `app.js` add your client id in facebook configuration

# Start applications

#### Start backend application

    cd backend
    mvn package
    java -jar target/*.jar
    
#### Start frontend application
    cd frontend
    npm install
    npm start
    http://test.myangularapp.com:8910
TODO


# Solution

Cookies authentication is **statefull**. The session identifier is kept both on Client side and on server side.
The applications are served on the same domain.

Token-based authentication is **stateless**. Cross domain requests are possible.
**Cross Site Request Forgery attacks(XSRF)** are not an issue if using JWT with local storage.

The implementation use tokens to communicate between backend and frontend application.
When login button is pressed, user is redirected to facebook to add credentials. A code is returned to a target URL. With it, Angular client obtains the access token from Facebook.
For the entire flow, [satellizer](https://github.com/sahat/satellizer) library is used.

A request for obtaining user details is created to server. It uses facebook authentication token in header.
Server asks for user details using facebook access token. If received, it returns the information to client.

[![alt text](https://github.com/iuliazidaru/springboot-angular-facebook-auth-demo/blob/master/README-resources/AuthenticationWithFacebook.jpg)](https://github.com/iuliazidaru/springboot-angular-facebook-auth-demo/blob/master/README-resources/AuthenticationWithFacebook.jpg)

# Alternatives (not tested)
Use the code provided by Facebook to obtain the authenticationToken on server. THe client secret should be used as auxiliary information, which cannot be used on client side.

# Future communication between client and server

- Server may request a long lived facebook token and use that one from now on.
- Server may produce their own tokens to use for other calls.



# Future improvements

Generate new token on server and use that token on other API requests.

##Resources

- https://spring.io/guides/tutorials/spring-boot-oauth2/ Backend code is based on `manual` project and changed to use tokens instead of cookies.
- https://github.com/angular/angular-seed for frontend project
- https://auth0.com/blog/cookies-vs-tokens-definitive-guide/
- https://github.com/sahat/satellizer used to secure angular client
- https://www.toptal.com/java/rest-security-with-jwt-spring-security-and-java
- https://stackoverflow.com/questions/15602667/possible-approach-to-secure-a-rest-api-endpoints-using-facebook-oauth
