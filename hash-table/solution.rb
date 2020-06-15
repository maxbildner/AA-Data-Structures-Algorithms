# EXERCISE 1
class Stack
  def initialize
    @underlying_array = []
  end

  def push(el)
    underlying_array.push(el)
    el
  end

  def pop
    underlying_array.pop
  end

  def peek
    underlying_array.last
  end

  private

  attr_reader :underlying_array

end



# EXERCISE 2
class Queue
  def initialize
    @underlying_array = []
  end

  def enqueue(el)
    underlying_array.push(el)
    el
  end

  def dequeue
    underlying_array.shift
  end

  def peek
    underlying_array.first
  end

  private

  attr_reader :underlying_array
  
end









# EXERCISE 3
class Map
  def initialize
    @underlying_array = []
  end

  def set(key, value)
    pair_index = underlying_array.index { |pair| pair[0] == key }
    if pair_index
      underlying_array[pair_index][1] = value
    else
      underlying_array.push([key, value])
    end
    value
  end

  def get(key)
    underlying_array.each { |pair| return pair[1] if pair[0] == key }
    nil
  end

  def delete(key)
    value = get(key)
    underlying_array.reject! { |pair| pair[0] == key }
    value
  end

  def show
    deep_dup(underlying_array)
  end

  private
  attr_reader :underlying_array
  
  def deep_dup(arr)
    arr.map { |el| el.is_a?(Array) ? deep_dup(el) : el }
  end  
end

pantry = Map.new()
pantry.set('apples', 2)     #=> 2
pantry.get('apples')        #=> 2
pantry.show                 #=> [["apples", 2]] 
pantry.delete('apples')     #=> 2
pantry.show                 #=> []
pantry.set('apples', 3)     #=> 3
pantry.underlying_array     #=> error (tried to acces private method)
