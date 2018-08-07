# REST API
_The services in this directory are modeled after the Angular 1.x ngResource for REST APIs within Angular._

Because Angular 2/4 doesn't supply an ngResource, a 3rd-party library is used:
http://ngx-restangular.com/

# Approach
Ticket LE-24 covers the work performed for the Location Editor and leveraged
in this app. See that README.md for details on how this was built up.

## Library Support
- This Stack Overflow post appears to be on point: https://stackoverflow.com/questions/36840590/angular2-module-similar-to-ngresource-resource
- As mentioned in the post, there is one library appears to fill the need:
https://github.com/troyanskiy/ngx-resource
- However, the features within this library may make it tough to provide the following:
  - Configuration for the handling of JSESSION
  - Interceptors for handling Exception responses from server
- The library ngx-restangular (http://ngx-restangular.com/) appears to meet these needs.

### Including the library in the app
To use the module in the app, the following command was executed:

`npm install ngx-restangular --save`

Then, adding the module to the `app.module.ts`:

under the `imports`:

`RestangularModule.forRoot(<RestangularConfigFactory>)`

where the `RestangularConfigFactory` is an optional factory for the config
information.

## Resource Location
- Providers appear to be the location for any application-wide services.
- The sub-directory/package for REST API resources is being called resources 
as implied by the examples given in the README.md for ngx-resource.
- Each package holds a Service, a Class for the data, and a Service Provider.

## Handling Authorization
TokenService from the FEC project provides the token used to obtain services.

# Testing
Resources fall under the category of "Services". Along with Pipes, Services are generally
tested in "isolation" instead of part of a TestBed.

I mention Injectors below because I didn't have another place to put these right now.

## Injectors

    const injector = ReflectiveInjector.resolveAndCreate([
      locationTypeServiceProvider
    ]);
    
## Using the Injector

      beforeEach(() => {
        toTest = new LocationTypeService(
          injector.get(LOCATION_TYPE_REST)
        );
      });
