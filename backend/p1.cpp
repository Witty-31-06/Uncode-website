#include <iostream>
using namespace std;

int main() {
    int t;
    cin >> t;

    // Check if t is within the valid range
    if (t < 1 || t > 1000) {
        return 1; // Exit with an error code
    }

    while (t--) {
        int a, b;
        cin >> a >> b;

        if (a < -1000000 || a > 1000000 || b < -1000000 || b > 1000000) {
            return 1; // Exit with an error code
        }

        cout << (a + b) << endl;
    }

    return 0;
}
