
#include "Core/Game.hpp"
#include "Leagues/SPL/SPL.hpp"
#include "Leagues/SPL/States/GamePhase.hpp"
#include "Leagues/SPL/States/GameState.hpp"

#include "napi.h"
#include <iostream>
#include <thread>

namespace NodeExperiments
{
  GameController::Leagues::SPL::SPL spl;
  GameController::Core::Game game(spl);
  clock_t begin_time = clock();

  void startTimer(const Napi::CallbackInfo& info)
  {
    // GameController::Leagues::SPL::SPL spl;
    // GameController::Core::Game game(spl);

    game.get<GameController::Leagues::SPL::States::GamePhase>().set(GameController::Leagues::SPL::States::GamePhaseType::GAME_PHASE_FIRST_HALF);
    game.get<GameController::Leagues::SPL::States::GameState>().set(GameController::Leagues::SPL::States::GameStateType::GAME_STATE_PLAYING);
    // game.get<GameController::Leagues::SPL::States::GameState>().set(GameController::Leagues::SPL::States::GameStateType::GAME_STATE_READY);

    // game.getTeam(1).getAgent(5)
    // TODO: Get system  time
    // while(true)
    // {

    //   game.proceed(100); // difference in time
    //   // std::cout << "Time Phase : " << game.get<GameController::Leagues::SPL::States::GamePhase>().getTimer().getRemainingTime() << std::endl;
    //   // std::cout << "Time State : " << game.get<GameController::Leagues::SPL::States::GameState>().getTimer().getRemainingTime() << std::endl;
    //   std::cout << float(clock() - begin_time) / CLOCKS_PER_SEC;
    //   // TODO: get latest time
    //   std::this_thread::sleep_for(std::chrono::milliseconds(50));
    // }
  }
  Napi::Object getState(const Napi::CallbackInfo& info)
  {

    Napi::Env env = info.Env();

    Napi::Object obj = Napi::Object::New(env);

    Napi::Array agents = Napi::Array::New(env, 5);
    for(int i = 0; i < agents.Length(); i++)
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

  Napi::Value proceed(const Napi::CallbackInfo& info)
  {
    Napi::Env env = info.Env();
    float elapsed = float(clock() - begin_time) / CLOCKS_PER_SEC;
    game.proceed(elapsed * 1000);
    // TODO: DO ACTION HERE
    begin_time = clock();
    Napi::Number rt = Napi::Number::New(env, game.get<GameController::Leagues::SPL::States::GamePhase>().getTimer().getRemainingTime());
    return rt;
  }

  Napi::Object Init(Napi::Env env, Napi::Object exports)
  {
    exports.Set(Napi::String::New(env, "startTimer"), Napi::Function::New(env, startTimer));
    exports.Set(Napi::String::New(env, "proceed"), Napi::Function::New(env, proceed));
    exports.Set(Napi::String::New(env, "getState"), Napi::Function::New(env, getState));
    return exports;
  }

  NODE_API_MODULE(addon, Init)
}
