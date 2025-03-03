#include <iostream>
#include <algorithm>
#include <string>

using namespace std;

int main() {
    string str;
    getline(cin, str);  // Read full input line, including spaces

    reverse(str.begin(), str.end());  // Reverse the entire string

    cout << str << endl;  // Output the reversed string

    return 0;
}
