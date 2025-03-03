#include <iostream>
#include <algorithm>
#include <string>

using namespace std;

int main() {
    int t;
    cin >> t;

    // Check if t is within the valid range
    if (t < 1 || t > 1000) {
        return 1; // Exit with an error
    }

    while (t--) {
        string str;
        cin >> str;  // Read input as a single word (no spaces)

        // Check if the length of str is within the valid range
        if (str.length() > 100) {
            return 1; // Exit with an error
        }

        reverse(str.begin(), str.end()); // Reverse the string
        cout << str << endl;  // Output the reversed string
    }

    return 0;
}
