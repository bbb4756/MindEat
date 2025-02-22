#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"  // here
#import <UIKit/UIKit.h>  // ✅ UIKit 추가 (폰트 로드 확인용)

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"myApp";
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];  // ✅ return 전에 실행되도록 위치 이동

  // ✅ 폰트 로드 확인용 로그 추가
  for (NSString* family in [UIFont familyNames]) {
      NSLog(@"📌 Font Family: %@", family);
      for (NSString* name in [UIFont fontNamesForFamilyName: family]) {
          NSLog(@"    - %@", name);
      }
  }

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
