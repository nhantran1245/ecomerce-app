/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  if (nums.length === 0) return [-1, -1];

  let left = 0;
  let right = nums.length - 1;

  return nums.indexOf((item) => item === target);
};
