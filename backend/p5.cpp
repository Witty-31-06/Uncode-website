#include <iostream>
#include <vector>

using namespace std;

void printPascalsTriangle(int n) {
    vector<vector<int>> pascal(n);

    for (int i = 0; i < n; i++) {
        pascal[i].resize(i + 1);
        pascal[i][0] = pascal[i][i] = 1;

        for (int j = 1; j < i; j++) {
            pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
        }
    }

    for (const auto& row : pascal) {
        for (int num : row) {
            cout << num << " ";
        }
        cout << endl;
    }
}

int main() {
    int t;
    cin >> t;

    // Validate t
    if (t < 1 || t > 1000) {
        return 1; // Exit with error
    }

    while (t--) {
        int n;
        cin >> n;

        // Validate n
        if (n < 1 || n > 30) {
            return 1; // Exit with error
        }

        printPascalsTriangle(n);
    }

    return 0;
}
