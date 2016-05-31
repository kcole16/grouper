package com.grouper;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import android.content.Intent;
import android.os.Bundle;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

  private ReactNativePushNotificationPackage mReactNativePushNotificationPackage; // <------ Add Package Variable

    CallbackManager mCallbackManager;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "grouper";
    }

    @Override
    protected String getJSBundleFile() {
        return CodePush.getBundleUrl();
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
      mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(this); // <------ Initialize the Package
        mCallbackManager = new CallbackManager.Factory().create();
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
        new VectorIconsPackage(),
        new FBSDKPackage(mCallbackManager),
        new CodePush("5wUeLq_9B6TqJ2rSVu2PuaB51FUN4kM7RRH2e", this, BuildConfig.DEBUG),
        mReactNativePushNotificationPackage // <---- Add the Package
        );
    }

    @Override
    protected void onNewIntent (Intent intent) {
      super.onNewIntent(intent);

      mReactNativePushNotificationPackage.newIntent(intent);
    }

   @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
    }
}
