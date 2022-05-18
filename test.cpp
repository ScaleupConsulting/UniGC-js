#include "napi.h"
#include <iostream>
#include <thread>
#include <format>

#include <stdlib.h>

namespace NodeExperiments
{
  // static int mins = 10;
  static int i = 0;
  void incrementThread(int &i)
  {
    while (i > 0)
    {
      // sleep for 10 seconds
      // increment your value
      i -= 100;
      // std::cout << "C++ : " << i << std::endl;

      std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
  }

  void startTimer(const Napi::CallbackInfo &info)
  {

    Napi::Env env = info.Env();

    if (!info[0].IsNumber())
    {
      Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    }

    double mins = info[0].As<Napi::Number>().DoubleValue();

    if (i == 0)
    {
      i = mins * 60 * 1000;
      std::thread t(incrementThread, std::ref(i));
      t.detach(); // or t.join()
    }
    else
    {
      i = mins * 60 * 1000;
    }

    // Napi::Number num = Napi::Number::New(env, i);
  }

  Napi::Value getTime(const Napi::CallbackInfo &info)
  {
    Napi::Env env = info.Env();

    Napi::Number num = Napi::Number::New(env, i);
    return num;
  }

  Napi::Object getState(const Napi::CallbackInfo &info)
  {

    Napi::Env env = info.Env();

    Napi::Object obj = Napi::Object::New(env);

    Napi::Array agents = Napi::Array::New(env, 5);
    for (int i = 0; i < agents.Length(); i++)
    {
      Napi::Object agent = Napi::Object::New(env);
      agent.Set(Napi::String::New(env, "penalized"), (rand() % 2 == 0) ? false : true);
      agents[i] = agent;
    }

    obj.Set(Napi::String::New(env, "kicking_teamId"), rand() % 2);
    obj.Set(Napi::String::New(env, "agents"), agents);
    // obj.Set(Napi::String::New(env, "kicking_teamId"), rand() % 2)
    //     obj.Set(Napi::String::New(env, "kicking_teamId"), rand() % 2)
    //         obj.Set(Napi::String::New(env, "kicking_teamId"), rand() % 2)
    // obj.Set(Napi::String::New(env, "actionQ"), actionQ);

    return obj;
  }

  Napi::Object Init(Napi::Env env, Napi::Object exports)
  {
    exports.Set(Napi::String::New(env, "startTimer"), Napi::Function::New(env, startTimer));
    exports.Set(Napi::String::New(env, "getTime"), Napi::Function::New(env, getTime));
    exports.Set(Napi::String::New(env, "getState"), Napi::Function::New(env, getState));
    return exports;
  }

  NODE_API_MODULE(addon, Init)
}
