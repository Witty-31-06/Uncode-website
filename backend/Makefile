CXX = g++
CXXFLAGS = -Wall -Wextra -O2
SOURCES_CPP = $(wildcard *.cpp)
EXECUTABLES_CPP = $(SOURCES_CPP:.cpp=)

all: $(EXECUTABLES_CPP)

%: %.cpp
	$(CXX) $(CXXFLAGS) $< -o $@
	chmod +x $@

clean:
	rm -f $(EXECUTABLES_CPP)
