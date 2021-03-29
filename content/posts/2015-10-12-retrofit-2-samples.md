---
boldLinks: true
date: 2015-10-12T00:00:00Z
tags:
- Api
- Java
- Android
title: Retrofit 2.0 Samples
url: /2015/10/retrofit-2-samples/
---

This post is about using Retrofit 2.0 (beta) to consume HTTP based APIs.

Retrofit is a great and popular API client library for Java (and by extension also for Android) developed by Square. Here's a few links to start things off:

* [Retrofit Homepage](http://square.github.io/retrofit/)
* [Retrofit Source on Github](https://github.com/square/retrofit)
* [Retrofit Javadoc](http://square.github.io/retrofit/javadoc/index.html)
* [Blog post about Retrofit 2.0](http://inthecheesefactory.com/blog/retrofit-2.0/en)

Source code with samples for this post is [available on Github](https://github.com/metachris/retrofit2-samples).

Retrofit makes it easy to develop API clients by describing API endpoints and the results like this:

{{< highlight java >}}
class Profile {
    String username;
    String email;
}

...

@GET("/profile")
Call<Profile> getProfile();
{{< / highlight >}}

A great endpoint to test API calls is [httpbin.org](http://httpbin.org), a website/api which returns various information about the request and more.

<h2>Getting Started</h2>

First of all we need to include the Retrofit library in a project. Using gradle this is
accomplished by adding the following dependencies to `build.gradle`:

{{< highlight bash >}}
compile 'com.squareup.retrofit:retrofit:2.0.0-beta2'
compile 'com.squareup.retrofit:converter-gson:2.0.0-beta2'
{{< / highlight >}}

The first dependency includes Retrofit itself, the second dependency includes the <a target="_blank" href="https://github.com/google/gson">GSON</a> converter library for (de-)serialization of JSON objects. Retrofit supports a number of different <a href="http://square.github.io/retrofit/#restadapter-configuration" target="_blank">converters</a> such as JSON, XML, Protocol Buffers and more.

<h2>The Code</h2>

This is the sample code for a number of httpbin.org API requests with GET and POST:

{{< highlight java >}}
import retrofit.Call;
import retrofit.Callback;
import retrofit.GsonConverterFactory;
import retrofit.Response;
import retrofit.Retrofit;
import retrofit.http.*;

import java.io.IOException;
import java.util.Map;

public class HttpApi {

    public static final String API_URL = "http://httpbin.org";

    /**
     * Generic HttpBin.org Response Container
     */
    static class HttpBinResponse {
        // the request url
        String url;

        // the requester ip
        String origin;

        // all headers that have been sent
        Map headers;

        // url arguments
        Map args;

        // post form parameters
        Map form;

        // post body json
        Map json;
    }

    /**
     * Exemplary login data sent as JSON
     */
    static class LoginData {
        String username;
        String password;

        public LoginData(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }

    /**
     * HttpBin.org service definition
     */
    public interface HttpBinService {
        @GET("/get")
        Call<HttpBinResponse> get();

        // request /get?testArg=...
        @GET("/get")
        Call<HttpBinResponse> getWithArg(
            @Query("testArg") String arg
        );

        // POST form encoded with form field params
        @FormUrlEncoded
        @POST("/post")
        Call<HttpBinResponse> postWithFormParams(
            @Field("field1") String field1
        );

        // POST with a JSON body
        @POST("/post")
        Call<HttpBinResponse> postWithJson(
            @Body LoginData loginData
        );
    }

    public static void testApiRequest() {
        // Retrofit setup
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(API_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        // Service setup
        HttpBinService service = retrofit.create(HttpBinService.class);

        // Prepare the HTTP request
        Call<HttpBinResponse> call = service.postWithJson(new LoginData("username", "secret"));

        // Asynchronously execute HTTP request
        call.enqueue(new Callback<HttpBinResponse>() {
            /**
             * onResponse is called when any kind of response has been received.
             */
            @Override
            public void onResponse(Response<HttpBinResponse> response, Retrofit retrofit) {
                // http response status code + headers
                System.out.println("Response status code: " + response.code());

                // isSuccess is true if response code => 200 and <= 300
                if (!response.isSuccess()) {
                    // print response body if unsuccessful
                    try {
                        System.out.println(response.errorBody().string());
                    } catch (IOException e) {
                        // do nothing
                    }
                    return;
                }

                // if parsing the JSON body failed, `response.body()` returns null
                HttpBinResponse decodedResponse = response.body();
                if (decodedResponse == null) return;

                // at this point the JSON body has been successfully parsed
                System.out.println("Response (contains request infos):");
                System.out.println("- url:         " + decodedResponse.url);
                System.out.println("- ip:          " + decodedResponse.origin);
                System.out.println("- headers:     " + decodedResponse.headers);
                System.out.println("- args:        " + decodedResponse.args);
                System.out.println("- form params: " + decodedResponse.form);
                System.out.println("- json params: " + decodedResponse.json);
            }

            /**
             * onFailure gets called when the HTTP request didn't get through.
             * For instance if the URL is invalid / host not reachable
             */
            @Override
            public void onFailure(Throwable t) {
                System.out.println("onFailure");
                System.out.println(t.getMessage());
            }
        });
    }
}{{< / highlight >}}

You can find a IntelliJ project with the full source code at [github.com/metachris/retrofit2-samples](https://github.com/metachris/retrofit2-samples).

Feedback, suggestions and pull requests are welcome!
