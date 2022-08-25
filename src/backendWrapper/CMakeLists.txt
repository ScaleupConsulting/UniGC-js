cmake_minimum_required(VERSION 3.15)
project(GameController VERSION 2021.0.0 LANGUAGES CXX)

include_directories(${CMAKE_JS_INC})
option(WITH_COVERAGE "Enable coverage." OFF)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)


find_package(protobuf REQUIRED )

# file(GLOB SOURCE_FILES "Core/*.cpp" "Core/*.h" "Leagues/*.cpp")

add_library(Flags::Default INTERFACE IMPORTED)

target_compile_options(Flags::Default INTERFACE
    $<$<CXX_COMPILER_ID:Clang,AppleClang,GNU>:-Wall>
    $<$<CXX_COMPILER_ID:Clang,AppleClang,GNU>:-Wextra>
    $<$<CXX_COMPILER_ID:Clang,AppleClang,GNU>:-Wno-switch>
    $<$<CXX_COMPILER_ID:MSVC>:/W3>
)

if(WITH_COVERAGE)
  target_compile_options(Flags::Default INTERFACE
      $<$<CXX_COMPILER_ID:Clang,AppleClang>:-fprofile-instr-generate>
      $<$<CXX_COMPILER_ID:Clang,AppleClang>:-fcoverage-mapping>
      $<$<CXX_COMPILER_ID:GNU>:--coverage>
  )
  target_link_options(Flags::Default INTERFACE
      $<$<CXX_COMPILER_ID:Clang,AppleClang>:-fprofile-instr-generate>
      $<$<CXX_COMPILER_ID:Clang,AppleClang>:-fcoverage-mapping>
      $<$<CXX_COMPILER_ID:GNU>:--coverage>
  )
endif()

add_subdirectory(Core)
add_subdirectory(Leagues/SPL)


add_library(${PROJECT_NAME} SHARED wrapper.cpp ${CMAKE_JS_SRC})

set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} Core SPL)

execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

target_include_directories(${PROJECT_NAME} PUBLIC ${CMAKE_BINARY_DIR})
target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})
add_definitions(-DNAPI_VERSION=4)

# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /std:c++17")
# set(CMAKE_CXX_STANDARD 17)
# set(CMAKE_CXX_STANDARD_REQUIRED ON)
# set(CMAKE_CXX_EXTENSIONS OFF)



