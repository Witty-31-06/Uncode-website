#include <iostream>
#include <vector>

void printPascalsTriangle(int n) {
    std::vector<std::vector<int>> pascal(n);

    for (int i = 0; i < n; i++) {
        pascal[i].resize(i + 1);
        pascal[i][0] = pascal[i][i] = 1;

        for (int j = 1; j < i; j++) {
            pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
        }
    }

    for (const auto& row : pascal) {
        for (int num : row) {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    }
}

int main() {
    int n;
    std::cin >> n;
    printPascalsTriangle(n);
    return 0;
}
