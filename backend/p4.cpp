#include <iostream>
#include <limits>

int main() {
    int n, num, maxNum = std::numeric_limits<int>::min();

    std::cin >> n;
    while (n--) {
        std::cin >> num;
        if (num > maxNum) {
            maxNum = num;
        }
    }

    std::cout << maxNum << std::endl;
    return 0;
}
