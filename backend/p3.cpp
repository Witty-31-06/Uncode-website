#include <iostream>

using namespace std;

int main() {
    int t;
    cin >> t;

    // Check if t is within the valid range
    if (t < 1 || t > 1000) {
        return 1; // Exit with an error
    }

    while (t--) {
        int n;
        cin >> n;

        // Check if n is within the valid range
        if (n < 1 || n > 1000) {
            return 1; // Exit with an error
        }

        int sum = 0, num;
        for (int i = 0; i < n; i++) {
            cin >> num;

            // Check if num is within the valid range
            if (num < -1000000 || num > 1000000) {
                return 1; // Exit with an error
            }

            sum += num;
        }

        cout << sum << endl;
    }

    return 0;
}
